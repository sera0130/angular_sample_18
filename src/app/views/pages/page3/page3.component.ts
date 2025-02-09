import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page3',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss',
  standalone: true,
})
export class page3Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService) {
    this.form = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const apiResponse: Item[] = [
      {
        title: '見出し1', subItems: [
          { subTitle: '小見出し1-1', unitPrice: 1000, quantity: 2 },
          { subTitle: '小見出し1-2', unitPrice: 1500, quantity: 3 }
        ]
      },
      {
        title: '見出し2', subItems: [
          { subTitle: '小見出し2-1', unitPrice: 2000, quantity: 2 },
          { subTitle: '小見出し2-2', unitPrice: 1000, quantity: 1 },
          { subTitle: '小見出し2-3', unitPrice: 1000, quantity: 5 }
        ]
      }
    ];
    this.populateForm(apiResponse);
    // this.fetchData().subscribe(data => this.populateForm(data));
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  getSubItems(item: AbstractControl) {
    return item.get('subItems') as FormArray;
  }

  fetchData(): Observable<Item[]> {
    const token = this.cookieService.get('authToken');
    const body = { authToken: token }; // リクエストボディに認証トークンを含めます

    // HTTP POSTリクエストでデータを取得する例。URLは仮定しています。
    return this.http.post<Item[]>('testUrl', body);
  }

  populateForm(apiResponse: Item[]) {
    apiResponse.forEach(item => {
      const subItemsArray = this.fb.array(item.subItems.map(subItem => this.fb.group({
        subTitle: subItem.subTitle,
        unitPrice: subItem.unitPrice,
        quantity: [0], // 初期値として数量を0に設定
        totalAmount: [{ value: 0, disabled: true }] // 初期値として金額を0に設定し、入力を無効化
      })));
      const itemGroup = this.fb.group({
        title: item.title,
        subItems: subItemsArray
      });
      this.items.push(itemGroup);
    });
  }

  calculateTotalAmount(subItemGroup: AbstractControl) {
    const quantity = subItemGroup.get('quantity')?.value || 0;
    const unitPrice = subItemGroup.get('unitPrice')?.value || 0;
    const totalAmount = quantity * unitPrice;
    subItemGroup.get('totalAmount')?.setValue(totalAmount);
    return totalAmount;
  }

  calculateGrandTotal() {
    return this.items.controls.reduce((total, itemGroup) => {
      const subItems = this.getSubItems(itemGroup);
      return total + subItems.controls.reduce((subTotal, subItemGroup) => {
        return subTotal + this.calculateTotalAmount(subItemGroup);
      }, 0);
    }, 0);
  }
}

export interface SubItem {
  subTitle: string;
  unitPrice: number;
  quantity?: number; // Optional to track quantity for calculation
}

export interface Item {
  title: string;
  subItems: SubItem[];
}