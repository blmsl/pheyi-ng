import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { CartService } from "app/cart/shared/cart.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { MenuService } from "app/nav/menu-service.service";
import { AuthService } from "app/auth.service";
import { AppUser } from "app/models/app-user";
import { CategoryService } from "app/category.service";
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import { Observable } from "rxjs/Observable";

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
