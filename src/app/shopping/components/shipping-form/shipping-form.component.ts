import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/services/auth.service";
import { OrderService } from "app/shared/services/order.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { ShoppingCart } from "app/shared/models/app-shopping-cart";
import { Order } from "app/shared/models/app-order";
import { ShippingService } from "app/shared/services/shipping.service";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { ShippingAddress } from 'shared/models/ShippingAddress';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  
  shipping = {}; 
  countries: string[] = [];  
  userSubscription : Subscription;
  shippingSubscription : Subscription;
  userId : string;
  userShipping : ShippingAddress;
  shipping$ : FirebaseObjectObservable<ShippingAddress>;
  
  
  constructor(
    private router : Router,
    private authService : AuthService,
    private orderService : OrderService,
    private shippingService : ShippingService,
    private db : AngularFireDatabase,
    private shoppingCartService : ShoppingCartService){ }

 ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid); 
    this.countries = this.shippingService.getCountries();
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();    
  }


  async placeOrder() {
    this.shippingService.update(this.userId, this.shipping);
    // let order = new Order(this.userId, this.shipping, this.cart)
    // let result = await this.orderService.placeOrder(order, this.shipping);
 
    // this.router.navigate(['/order-success', result.key]);
  }  

}
