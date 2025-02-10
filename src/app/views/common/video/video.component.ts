import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { StatusListComponent } from '../status-list/status-list.component';

interface Status {
  title: string;
  icon: string;
  status: string;
}

@Component({
  selector: 'app-video',
  imports: [CommonModule, StatusListComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
  standalone: true
})
export class VideoComponent implements AfterViewInit {
  @Input() videoSource: string = '';
  @Input() statuses: Status[] = [];
  @ViewChild('videoRef') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.videoElement.nativeElement = this.videoElement.nativeElement;
  }

  onPlay() {
    this.videoElement.nativeElement.play();
  }

  onPause() {
    this.videoElement.nativeElement.pause();
  }

  onStop() {
    this.videoElement.nativeElement.pause();
    this.videoElement.nativeElement.currentTime = 0;
  }

  onRewind() {
    this.videoElement.nativeElement.currentTime -= 5;
  }

  onForward() {
    this.videoElement.nativeElement.currentTime += 5;
  }
}