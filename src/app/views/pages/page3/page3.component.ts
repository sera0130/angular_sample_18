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
      { title: '見出し1', subItems: [{ subTitle: '小見出し1-1' }, { subTitle: '小見出し1-2' }] },
      { title: '見出し2', subItems: [{ subTitle: '小見出し2-1' }, { subTitle: '小見出し2-2' }, { subTitle: '小見出し2-3' }] }
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
      const subItemsArray = this.fb.array(item.subItems.map(subItem => this.fb.control(subItem.subTitle)));
      const itemGroup = this.fb.group({
        title: item.title,
        subItems: subItemsArray
      });
      this.items.push(itemGroup);
    });
  }
}

interface SubItem {
  subTitle: string;
}

interface Item {
  title: string;
  subItems: SubItem[];
}