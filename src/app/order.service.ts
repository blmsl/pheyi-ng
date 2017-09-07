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
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/orders');
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
