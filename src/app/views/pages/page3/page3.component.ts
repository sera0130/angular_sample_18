import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../../common/validators/custom.validator';
import { HttpService } from '../../../common/services/http.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../common/services/auth.service';
import { OneTimeAuthResponse } from '../../../common/interfaces/interface';

@Component({
  selector: 'app-page3',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss',
  standalone: true,
})
export class page3Component implements OnInit {
  form: FormGroup;
  requiredError = false;
  numericError = false;
  onInitResponseError = false;
  submitResponseError = false;

  constructor(private fb: FormBuilder, private httpService: HttpService, private authService: AuthService) {
    this.form = this.fb.group({
      inputOneTime: ['', [Validators.required, CustomValidator.numeric()]]
    });
  }

  ngOnInit(): void {
    // APIコール
    this.httpService.post('your-endpoint', this.form.value).subscribe(response => {
      console.log('API call successful', response);
    }, error => {
      this.onInitResponseError = true;
      console.error('API call failed', error);
    });
  }

  /**
   * フォームの送信処理（認証）
   */
  onSubmit(): void {
    // 初期化
    this.submitResponseError = false;

    // 入力値チェック
    this.validateForm();

    // 認証APIコール
    if (this.form.valid) {
      this.httpService.post<OneTimeAuthResponse>('your-endpoint', this.form.value).subscribe(response => {
        console.log('API call successful', response);
      
        // 認証トークンをセット
        const token = 'your-auth-token';
        this.authService.setAuthToken(token);
        console.log('Token set:', this.authService.getAuthToken());
      }, error => {
        this.submitResponseError = true;
        console.error('API call failed', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * フォームのバリデーション処理
   */
  validateForm(): void {
    this.requiredError = this.form.get('inputOneTime')?.errors?.['required'] || false;
    this.numericError = this.form.get('inputOneTime')?.errors?.['numeric'] || false;
  }

  /**
   * フォームのバリデーション結果取得
   */
  get isFormValid(): boolean {
    return this.form.valid;
  }
}
