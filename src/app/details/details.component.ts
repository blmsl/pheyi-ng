import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";
import { FormControl } from "@angular/forms/forms";
import { ItemsService } from "app/items/shared/items.service";
import { CartService } from "app/cart/shared/cart.service";
import { Item } from "app/items/shared/item";
import { CartItem } from "app/cart/shared/cartItem";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  item: Item;
  user: string;
  authState;
  sum: any;
  // item: FirebaseObjectObservable<any>;
  AlsoLike: FirebaseListObservable<any[]>;
  key: string;
  sizeInInches;
  sizeInCm;
  ukSizes;
  toggleState;


  constructor(private route: ActivatedRoute,
    private af: AngularFire,
    private itemSvc: ItemsService,
    private cartSvc: CartService) { }

  ngOnInit() {
    //  this.key  = this.route.snapshot.params['key'];
    this.toggleState = "toggle size to see more size & Fit details"
    this.af.database.list('/Sizes/women/inches').subscribe(snapshot => {
      this.ukSizes = snapshot;
    })
    this.sum = 0;

    this.af.auth.subscribe(authState => {
      this.authState = authState;
      this.user = authState.uid
    })

    //get key from route params
    this.route.params.subscribe(
      (params: Params) => {
        this.key = params['key'];

        //get details by key
        this.itemSvc.getItem(this.key).subscribe((item) => this.item = item);
       
        //get items for you may also like
        this.AlsoLike = this.itemSvc.getItemsList({ limitToLast: 4 });        
        // this.user.name = params['name'].replace(/\s+/g,'-');
      }
    );

  }

  addItemToCart($key: string) {

    if (this.authState) {
      
      //get the item
      var itemAdding;
      this.itemSvc.getItem($key).subscribe((item) => itemAdding = item);
     
      //add item to cart
      var cartItem  = new CartItem();
      cartItem.imageURL = itemAdding.imageURL;
      cartItem.itemKey = $key;
      cartItem.name = itemAdding.title;
      cartItem.price = itemAdding.price,
      cartItem.quantity = 1;

      this.cartSvc.addItemToCart(this.user, cartItem);
      alert('added item to cart');
      
    } else {
      document.location.href = document.location.origin + "/login";

    }


  }

  toggleSize($uk_size) {
    this.toggleState = "loading ...."

    //inches
    this.af.database.list('/Sizes/women/inches', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInInches = snapshot;
    })

    //cm
    this.af.database.list('/Sizes/women/cm', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInCm = snapshot;
      this.toggleState = '';

    })

  }


}
