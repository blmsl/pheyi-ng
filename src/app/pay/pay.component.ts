import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Order } from "app/pay/order";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  orderTotal: number = 0;
  ref: string[];
  status;
  isSuccess : boolean = false;
  isFailed : boolean = false;
  showSpinner : boolean = true;
  orderItems : FirebaseListObservable<Order[]>;
  shippingAddress : FirebaseObjectObservable<any>;

  constructor(private router: ActivatedRoute, private http: Http, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.ref = this.router.snapshot.params["ref"];

    this.afAuth.authState.subscribe(authState => {

      if (authState) {

        //check if payment was recieved     
        let url = 'https://api.paystack.co/transaction/verify/' + this.ref;
        const headers = new Headers({
          'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
        });

        //paystack verify
        this.http.get(url, { headers: headers }).subscribe(response => {
          if (response.json().status) {
            //this.status = 'transaction was successful'
            this.showSpinner = false;

            this.isSuccess = true;
            this.isFailed = false;

            //set order isPayed = true
            //check of order exists first
            this.db.object('/orders/' + this.ref)
              .subscribe(snapshot => {
                if (snapshot.$value !== null) {
                  this.db.object('/orders/' + this.ref).update({ isPayed: true });
                  this.orderItems = this.db.list('/orders/'+this.ref+'/items')

                  this.db.object('/orders/'+this.ref+'/shippingDetails').subscribe(snapshot=>{
                    this.shippingAddress = snapshot;
                  })
                  
                  //Sum total
                  this.orderItems.forEach(orderArray => {
                    orderArray.forEach(order => {
                      this.orderTotal = this.orderTotal + order.price;
                    })
                  })
                }
              })

            // clear shopping cart
            this.db.object('/shoppingCart/' + authState.uid).remove();
            this.db.object('/shoppingTotal/' + authState.uid).remove();

          } else {
            // this.status = 'transaction failed'
            this.showSpinner = false;
            this.isFailed = true;
            this.isSuccess = false;
          }
        })

      } else {
        this.showSpinner = false;
        this.status = 'You are not authorized to view this page!!!'
      }
    })


  }

}
