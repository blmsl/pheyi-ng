import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { CartService } from "app/cart/shared/cart.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  count: number;
  cartItems: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private cartSvc: CartService,
    private router: Router) {

  }

  isLoggedIn: boolean;
  isAdmin: boolean;


  ngOnInit() {

    // Check if user is authenticated
    //------------------------------------------------------------------------------

    this.afAuth.authState.subscribe(authState => {
      if (!authState) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        if (authState.email === 'daniel.adigun@digitalforte.ng') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }

      }
      //get no of items in cart     
      this.cartSvc.getCartItemsList(authState.uid).subscribe((cartItems) => {
        this.count = cartItems.length;
      })

    })
  }

  logOff() {
    this.cartSvc.removeAll();
    this.afAuth.auth.signOut().then(e => {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
      // window.location.href = document.location.origin + '/'; 
    });

  }
}
