import { Component, OnInit, Input } from '@angular/core';
import { Product } from "app/models/app-products";
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product : Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
