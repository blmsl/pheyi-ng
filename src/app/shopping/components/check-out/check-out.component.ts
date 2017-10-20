import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { OrderService } from "app/shared/services/order.service";
import { Observable } from "rxjs/Observable";
import { ShippingService } from "app/shared/services/shipping.service";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "app/shared/services/auth.service";
import { Router } from "@angular/router";
import { PaymentGatewayService } from "app/shared/services/payment-gateway.service";
import { ProductService } from "app/shared/services/product.service";
import { Order } from 'shared/models/app-order';
import { ShoppingCart } from 'shared/models/app-shopping-cart';
import { Product } from 'shared/models/app-products';
import { ShippingAddress } from 'shared/models/ShippingAddress';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  order: Order;
  userShipping: ShippingAddress;

  checkShipping$ : Observable<boolean>;
  cart$: Observable<ShoppingCart>;
  
  userSubscription : Subscription;
  userId : string;
  email : string;
  cart : ShoppingCart;
  showChangeAddress : boolean = false;
  
 
  constructor(
    private shippingService : ShippingService,
    private authService : AuthService,
    private orderService : OrderService,
    private router : Router,
    private shoppingCartService : ShoppingCartService,
    private productService : ProductService,
    private paymentService : PaymentGatewayService){ }
  
  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.email = user.email;

      this.shippingService.getSingle(this.userId).subscribe(shipping => this.userShipping = shipping);
   }); 

   this.cart$ =  await this.shoppingCartService.getCart();
   this.checkShipping$ = await this.shippingService.checkShipping(this.userId);
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();    
  }

  async placeOrder() {

    this.cart$.subscribe(cart => {
      this.cart = cart;

      cart.items.forEach(item => {
        //check if its soldOut
        var i = 0;
        this.productService.isSoldOut(item.$key).subscribe(status => {
          if(status === true){
            var product = new Product();
            Object.assign(product, item);
            
            alert('Opps! '+ item.title+ ' has just been sold out!. Dont worry we have removed it from your cart.')
            this.shoppingCartService.removeFromCart(product);
            cart.items.splice(i, 1);
          }
          i = i+1;
        })

      })

      //place order if at least one item is in stock
      if(cart.items.length !== 0){

        let opt = confirm('please confirm you want to proceed with payment');
        if(opt){

            this.order = new Order(this.userId, this.userShipping, cart)
        }    
      }
    });

    let result = await this.orderService.placeOrder(this.order, this.userShipping);
    this.paymentService.payWithPaystack(this.cart.totalPrice, result.key, this.email)
        .subscribe(response => {
          window.location.href = (response.json().data.authorization_url); 
        }, error =>{
           alert(JSON.parse(error._body).message);
        });       
    
  } 
 
  changeAddress(){
    this.showChangeAddress = true;
  }

  cancelChangeAddress(){
    this.showChangeAddress = false;    
  }
  
 
}
