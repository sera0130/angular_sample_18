import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Status {
  title: string;
  icon: string;
  status: string;
}

@Component({
  selector: 'app-status-list',
  imports: [CommonModule],
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.scss'
})
export class StatusListComponent {
  @Input() statuses: Status[] = [];
}
