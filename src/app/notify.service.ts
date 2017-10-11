import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotifyService {

  constructor(
    private http: HttpClient,
    private db : AngularFireDatabase
  ) { }

  smsUrl = 'https://api.infobip.com/sms/1/text/single';  
  emailUrl = 'https://api.mailgun.net/v3/pheyi.ng';

  sendSMS(phone, message){
    let headers = new HttpHeaders();

    headers.set('Authorization', 'Basic ZGlnaUZvcnRlMTpUZXN0MTIzIQ==');
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    let body = { from : 'Pheyi-NG', to:phone, text : message, }
    return this.http.post(this.smsUrl, body, {headers})
    
  }

  sendEmail(email, message){
    //TODO: http post send Email.
  }

  addPhone(phoneNumber){
    //check if phone exists
    this.db.list('/phone', {
      query:{
        orderByChild : 'phone',
        equalTo : phoneNumber
      }
    }).subscribe((result)=>{
      if(result.length !== 0){
        console.log('We have your phone number');
      }
      if(result.length === 0){
        this.db.list('/phone').push({phone: phoneNumber})
          .then(()=>{
            this.sendSMS(phoneNumber,
               "Thank you for subscribing to our Notification service. We'll notify you of latest dresses and new arrivals.")
            }).then(()=>{console.log('message sent to '+phoneNumber)})
              .catch((err)=>{console.log('SMS Error', err) })
          .catch((err)=>{console.log('Push Error', err)})
      }
    })
  }
}