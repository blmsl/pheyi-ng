import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { Product } from '../../models/app-products';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product : Product;
  @Input ('size') size : number
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product, this.size);
  }

  
  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }


}
