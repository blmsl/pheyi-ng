import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/services/auth.service";
import { AppUser } from "app/shared/models/app-user";
import { CategoryService } from "app/shared/services/category.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { ShoppingCart } from "app/shared/models/app-shopping-cart";
import { Observable } from "rxjs/Observable";
import { CartService } from 'app/shopping/services/cart.service';

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
  appUser : AppUser
  isAdmin : boolean = false;
  categories$;
  cart$ : Observable<ShoppingCart>;

  constructor(
    private cartSvc: CartService,
    private auth : AuthService,
    categoryService : CategoryService,
    private cartService : ShoppingCartService) {

      auth.appUser$.subscribe(appUser => {this.appUser = appUser; 
        if (appUser) { if(appUser.isAdmin)  this.isAdmin = true; }
        else{ this.isAdmin = false;}
      })

      this.categories$ = categoryService.getAll();
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  logOff() {
    this.cartSvc.removeAll();
    this.auth.logOut();
  }

  toggleMenu($menu){
     $('a[href=#'+$menu+']').trigger("click");
  }
}
