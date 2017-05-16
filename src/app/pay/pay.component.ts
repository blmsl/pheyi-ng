import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  ref: string[];
  status;

  constructor(private router: ActivatedRoute, private http: Http, private af: AngularFire) { }

  ngOnInit() {

    this.ref = this.router.snapshot.params["ref"];

    this.af.auth.subscribe(authState => {

      if (authState) {

        //check if payment was recieved     
        let url = 'https://api.paystack.co/transaction/verify/' + this.ref;
        const headers = new Headers({
          'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
        });

        //paystack verify
        this.http.get(url, { headers: headers }).subscribe(response => {
          if (response.json().status) {
            this.status = 'transaction was successful'

            //set order isPayed = true
            //check of order exists first
            this.af.database.object('/orders/' + this.ref)
              .subscribe(snapshot => {
                if (snapshot.$value !== null) {
                  this.af.database.object('/orders/' + this.ref).update({ isPayed: true });
                }
              })

            // clear shopping cart
            this.af.database.object('/shoppingCart/' + authState.uid).remove();
            this.af.database.object('/shoppingTotal/' + authState.uid).remove();

          } else {
            this.status = 'transaction failed'
          }
        })

      } else {
        this.status = 'You are not authorized to view this page!!!'
      }
    })


  }

}