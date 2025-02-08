import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * カスタムバリデーター
 */
export class CustomValidator {
  /**
   * 半角数字バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static numeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[0-9]+$/.test(value);
      return isValid ? null : { numeric: {value: control.value} };
    };
  }

  /**
   * 半角英数字バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static alphaNumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[a-zA-Z0-9!-/:-@[-`{-~]*$/.test(value);
      return isValid ? null : { numeric: {value: control.value} };
    };
  }

  /**
   * 半角英数記号バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static alphaNumericSymbols(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[a-zA-Z0-9]*$/.test(value);
      return isValid ? null : { numeric: {value: control.value} };
    };
  }

  /**
   * 半角数字&先頭0バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static numericLead0(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^0\d+$/.test(value);
      return isValid ? null : { numeric: {value: control.value} };
    };
  }

  /**
   * 全角バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static fullWidthChara(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[^\x01-\x7E]+$/.test(value);
      return isValid ? null : { fullWidthChara: {value: control.value} };
    };
  }
  
  /**
   * 最大数値バリデーション
   * @returns バリデーションエラーがある場合はエラーオブジェクトを返す
   */
  static maxNumber(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = !isNaN(control.value) && control.value <= max;
      return isValid ? null : { maxNumber: {value: control.value} };
    };
  }
}