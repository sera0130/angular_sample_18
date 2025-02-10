import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { VideoComponent } from '../../common/video/video.component';
import { DialogService } from '../../../common/services/dialog.service';

@Component({
  selector: 'app-page4',
  imports: [VideoComponent],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.scss',
  standalone: true
})
export class Page4Component implements OnInit {
  videoSource1 = '/assets/videos/video1.mp4';
  videoSource2 = '/assets/videos/video2.mp4';
  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;

  constructor(private dialogService: DialogService) {}

  statuses1 = [
    { title: 'Status 1', icon: 'path/to/icon1.png', status: 'Active' },
    { title: 'Status 2', icon: 'path/to/icon2.png', status: 'Inactive' },
    // 他のステータス
  ];

  statuses2 = [
    { title: 'Status 1', icon: 'path/to/icon1.png', status: 'Active' },
    { title: 'Status 2', icon: 'path/to/icon2.png', status: 'Inactive' },
    // 他のステータス
  ];

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dialogService.setDialogContainer(this.dialogContainer);
  }

  async openDialogExample() {
    const result = await this.dialogService.openDialog('Are you sure?', true);
    if (result) {
      // OK clicked
    } else {
      // Cancel clicked
    }
  }
}
