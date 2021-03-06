import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Router } from "@angular/router";


@Injectable()
export class PaymentGatewayService {
  private verifyPaystackUrl: string;

  private paystackHeaders: Headers
  private payStackUrl : string

  constructor(private http : Http, router : Router) { 
    this.paystackHeaders  = new Headers({
      // 'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
      'Authorization': 'Bearer sk_live_5ae20693da3d8cd9fbe6b975db7ac30db8465e46'
    });

    this.payStackUrl = `https://api.paystack.co/transaction/initialize`;
    this.verifyPaystackUrl = 'https://api.paystack.co/transaction/verify/';
    
  }

  payWithPaystack(amount: number, orderId: string, email : string){
    var payload = {
        reference: orderId,
        email: email,
        amount: amount * 100,
        callback_url: document.location.origin + '/order-success/'+orderId+'/orderId/'
    };
    return this.http.post(this.payStackUrl,
           JSON.stringify(payload),
           { headers : this.paystackHeaders })
    
  }

  confirmPaystackPayment(referenceId){
    return this.http.get(this.verifyPaystackUrl + referenceId, {headers : this.paystackHeaders})
      // .map(response => {
      //   return (response.status) ? true : false;
      // })
  }

}
