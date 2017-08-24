import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { FormControl, NgForm } from "@angular/forms";
import { ItemsService } from "app/items/shared/items.service";
import { CartService } from "app/cart/shared/cart.service";
import { Item } from "app/items/shared/item";
import { CartItem } from "app/cart/shared/cartItem";
import { ReviewsService } from "app/reviews/shared/reviews.service";

import { AngularFireAuth } from "angularfire2/auth";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  reviewList: FirebaseListObservable<any[]>;

  item: Item;
  itemTitle : string [] = [];
  isSoldOut : boolean;

  user: string;
  authState;
  sum: any;
  // item: FirebaseObjectObservable<any>;
  // AlsoLike: FirebaseListObservable<any[]>;
  AlsoLike: Item[] = [];
  key: string;
  sizeInInches;
  sizeInCm;
  ukSizes;
  toggleState;

  quantityValue : number = 1;
  selectedSize : string = "";
  selectedQuantity : number; 
  private selectUndefinedOptionValue:any;


  showSpinner : boolean = true;
  showContent : boolean = false;
 



  @ViewChild('addToCartForm') $addToCartForm : NgForm;
  @ViewChild('size') $size : number;

  constructor(private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db:AngularFireDatabase,
    private itemSvc: ItemsService,
    private cartSvc: CartService,
    private reviewSvc : ReviewsService) { }

  ngOnInit() {

    
    
    //  this.key  = this.route.snapshot.params['key'];
    this.toggleState = " "
    this.db.list('/Sizes/women/inches').subscribe(snapshot => {
      this.ukSizes = snapshot;
    })
    this.sum = 0;

    this.afAuth.authState.subscribe(authState => {
      this.authState = authState;
      this.user = authState.uid
    })

    //get key from route params
    this.route.params.subscribe(
      (params: Params) => {
        this.key = params['key'];

        //get the count 
        this.reviewList = this.reviewSvc.getReviewsList({ orderByChild : 'dressKey', equalTo: this.key});
        

        //get details by key
       this.itemSvc.getItem(this.key).subscribe(
        
        (item) => {
          this.item = item;
          this.isSoldOut = item.isSoldOut;
          this.showSpinner = false;
          this.showContent = true;
        }
      );
             
       
        //get items for you may also like
        // this.AlsoLike = this.itemSvc.getItemsList({ limitToLast: 4 });        
        this.itemSvc.getItemsList({ limitToLast: 4 }).subscribe((alsoLikes)=>{
          alsoLikes.forEach(alsoLike => {
            const title = alsoLike.title.replace(/\s+/g, '-');
            this.itemTitle.push(title);
            this.AlsoLike.push(alsoLike);
            console.log(this.itemTitle);
          })
        });        
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
    this.db.list('/Sizes/women/inches', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInInches = snapshot;
    })

    //cm
    this.db.list('/Sizes/women/cm', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInCm = snapshot;
      this.toggleState = '';

    })

  }

  incrementQuantity(){
    
    this.quantityValue = this.quantityValue + 1;
  }

  decrementQuantity(){

    if(this.quantityValue  > 1){
          this.quantityValue = this.quantityValue - 1;   
    }

  }

}
