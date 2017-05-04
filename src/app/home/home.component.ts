import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
    templateUrl : './home.component.html',
    styleUrls:['./home.component.css']
})


export class HomeComponent{
    bestSellers : FirebaseListObservable<any[]>;
    newArrivals : FirebaseListObservable<any[]>;

    constructor(private af : AngularFire){

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
}
