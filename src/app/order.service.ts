import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShippingService } from "app/shipping.service";
import { ShippingAddress } from "app/ShippingAddress";
import { AuthService } from "app/auth.service";

@Injectable()
export class OrderService {
  shipping : FirebaseObjectObservable<ShippingAddress>;
  userId : string;
  

  constructor(
     private db: AngularFireDatabase,
     private authService : AuthService,
     private shippingService: ShippingService,
     private shoppingCartService: ShoppingCartService) { 

       authService.user$.subscribe(user => this.userId = user.uid);
     }

  async placeOrder(order, shipping) {

    this.db.object('/shipping/'+this.userId).update(shipping);
    let result = await this.db.list('/orders').push(order);
    // this.shoppingCartService.clearCart();
    return result;
  }

  payForOrder(orderId){
    this.getOrderById(orderId).subscribe(order => {
      order.isPayed = true;

      this.updateOrder(orderId, order);
    });
  }

  updateOrder(orderId, order){
    this.db.object('/orders/'+orderId).update(order);
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  getOrderById(orderId){
    return this.db.object('/orders/'+orderId);
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }
}
