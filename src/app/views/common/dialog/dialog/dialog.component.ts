import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true
})
export class DialogComponent {
  @Input() message: string = '';
  @Input() showCancel: boolean = false;
  @Output() dialogClose = new EventEmitter<boolean>();

  onOkClick(): void {
    this.dialogClose.emit(true);
  }

  onCancelClick(): void {
    this.dialogClose.emit(false);
  }
}
