import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { CartService } from "app/cart/shared/cart.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { MenuService } from "app/nav/menu-service.service";
import { AuthService } from "app/auth.service";
import { AppUser } from "app/models/app-user";
import { CategoryService } from "app/category.service";

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

  constructor(private cartSvc: CartService, private auth : AuthService, categoryService : CategoryService) {
      auth.appUser$.subscribe(appUser => {
        this.appUser = appUser; 
        if (appUser) { if(appUser.isAdmin)  this.isAdmin = true; }
        
        else{ this.isAdmin = false;}
      })

      this.categories$ = categoryService.getAll();
  }

  ngOnInit() {

    // Get no of items in cart if user is authenticated
    //------------------------------------------------------------------------------

    this.auth.user$.subscribe(user => {
      if (user) {
        this.cartSvc.getCartItemsList(user.uid).subscribe((cartItems) =>  this.count = cartItems.length)
     }  
     
    })
  }

  logOff() {
    this.cartSvc.removeAll();
    this.auth.logOut();
  }

  toggleMenu($menu){
     $('a[href=#'+$menu+']').trigger("click");
  }
}
