import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import { Subscription } from "rxjs/Subscription";
import { Product } from "app/models/app-products";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product : Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  
  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }


}
