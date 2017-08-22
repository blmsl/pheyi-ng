import { Component, OnInit } from '@angular/core';
// import { MessagingService } from './messaging.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  
  // message;

  // constructor(private msgService: MessagingService){}

  ngOnInit(): void {
    // this.msgService.getPermission();
    // this.msgService.recieveMessage();
    // this.message = this.msgService.currentMessage;
  }

  title = 'app works!';
}
