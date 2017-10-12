import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../shared/services/messaging.service'

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.css']
})
export class PushnotificationComponent implements OnInit {
  
  message;

  constructor(private msgService: MessagingService) { }

  ngOnInit() : void {
    this.msgService.getPermission();
    this.msgService.recieveMessage();
    this.message = this.msgService.currentMessage;
  }

}
