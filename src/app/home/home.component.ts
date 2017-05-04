import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
    templateUrl : './home.component.html',
    styleUrls:['./home.component.css']
})


export class HomeComponent{
    bestSellers : FirebaseListObservable<any[]>;
    newArrivals : FirebaseListObservable<any[]>;
    user : any;
    sum;

    constructor(private af : AngularFire){
        this.sum = 0;

        this.af.auth.subscribe(authState =>{
            this.user = authState.uid
        })
    }

    ngOnInit(){

        //get all best sellers
        this.bestSellers = this.af.database.list('/items', {
            query:{
                orderByChild : 'isBestSeller',
                equalTo : true,
                limitToLast : 3,
            }
        })

        //get all new arrivals 
        this.newArrivals = this.af.database.list('/items',{
           query:{ 
               orderByChild : 'isNewArrival',
               equalTo : true,
               limitToLast : 8
           }
        })
    }

    addItemToCart($key : string){
        //get the item
        var item;
        this.af.database.object('/items/'+$key).subscribe(snapshot=>{
            item = snapshot
        })
        
        this.sum = this.sum + item.price
        
         //add item to cart
          this.af.database.list('/shoppingCart/'+this.user)
                .push({
                    key : $key,
                    name : item.title,
                    imageURL : item.imageURL,
                    price : item.price,
                    quantity : 1
                })
                .then(x=>{
                   
                    alert('added item to cart')
                })
                .catch(x=>{alert('unable to add item to cart')})
         
         
       
    }
}
