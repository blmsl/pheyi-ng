import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";
import { CartService } from "app/cart.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [CartService]
})
export class DetailsComponent implements OnInit {
  user: string;
  authState;
  sum: any;
  item: FirebaseObjectObservable<any>;
  AlsoLike: FirebaseListObservable<any[]>;
  key: string;


  constructor(private route: ActivatedRoute, private af: AngularFire, private ct: CartService) { }

  ngOnInit() {
    //  this.key  = this.route.snapshot.params['key'];

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
        this.af.database.object('/items/' + this.key)
          .subscribe(
          snapshot => {
            this.item = snapshot;
          }
          );

        //get items for you may also like
        this.AlsoLike = this.af.database.list('/items', {
          query: {
            limitToLast: 4
          }
        });

        // this.user.name = params['name'].replace(/\s+/g,'-');
      }
    );

  }

  addItemToCart($key: string) {
    
    if(this.authState){
      //get the item
    var item;
    this.af.database.object('/items/' + $key).subscribe(snapshot => {
      item = snapshot
    })

    this.sum = this.sum + item.price

    //add item to cart
    this.af.database.list('/shoppingCart/' + this.user)
      .push({
        key: $key,
        name: item.title,
        imageURL: item.imageURL,
        price: item.price,
        quantity: 1
      })
      .then(x => {

        alert('added item to cart')
      })
      .catch(x => { alert('unable to add item to cart') })

    //push to sum
    this.af.database.object('/shoppingTotal/' + this.user).update({
      total: this.sum
    })

    //update cart count
    this.ct.addCartCount(1);

    }else{
      document.location.href = document.location.origin+"/login";

    }
    

  }



}
