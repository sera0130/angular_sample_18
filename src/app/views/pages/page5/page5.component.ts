import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-query-param',
  template: `
    <form [formGroup]="form">
      <label>
        Query Param:
        <input formControlName="queryParam">
      </label>
    </form>
  `,
  imports: [ReactiveFormsModule], // ここでReactiveFormsModuleをインポートします。
  styles: []
})
export class Page5Component {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      queryParam: ['']
    });

    this.route.queryParams.subscribe(params => {
      const queryParamValue = params['paramName']; // クエリパラメータ名に置き換えてください
      this.form.patchValue({ queryParam: queryParamValue });
      sessionStorage.setItem('authToken', 'your-auth-token'); // 認証トークンの格納
    });
  }
}
