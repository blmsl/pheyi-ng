import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import { AuthService } from "app/auth.service";
import { OrderService } from "app/order.service";
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import { Order } from "app/models/app-order";
import { ShippingService } from "app/shipping.service";
import { ShippingAddress } from "app/ShippingAddress";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart : ShoppingCart;
  shipping = {}; 
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
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();    
  }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order, this.shipping);
 
    this.router.navigate(['/order-success', result.key]);
  }  

}