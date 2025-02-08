import { Component } from '@angular/core';
import { HttpService } from '../../../common/services/http.service'; 

@Component({
  selector: 'app-page2',
  imports: [],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component {
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get('endpoint').subscribe(response => {
      console.log(response);
    });

    this.httpService.post('endpoint', { key: 'value' }).subscribe(response => {
      console.log(response);
    });

    this.httpService.put('endpoint', { key: 'value' }).subscribe(response => {
      console.log(response);
    });

    this.httpService.delete('endpoint').subscribe(response => {
      console.log(response);
    });
  }
}
