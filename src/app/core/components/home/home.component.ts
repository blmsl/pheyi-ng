import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Item } from 'app/shopping/components/items/shared/item';
import { ItemsService } from 'app/shopping/components/items/shared/items.service';

declare var jquery: any;
declare var $: any;
// import { AngularFire, FirebaseListObservable } from "angularfire2";


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit, OnDestroy {
    showSpinnerJustIn: boolean = true;
    showSpinner: boolean = true;
    cartItems: FirebaseListObservable<any[]>;

    bestSellers: Item[];
    newArrivals: Item[];

    user: any;
    sum;
    images: any[];
    itemTitleBestSellers: string[] = [];
    itemTitleNewArrivals: string[] = [];

    constructor(private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private itemSvc: ItemsService) {

        this.sum = 0;

    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

    ngOnInit() {

        //get all best sellers
        this.itemSvc.getItemsList({
            orderByChild: 'isBestSeller',
            equalTo: true,
            limitToLast: 6
        }).subscribe(bestSellers => {
            this.bestSellers = bestSellers;
            this.bestSellers.reverse();
            
            bestSellers.forEach(bestSeller => {
                var title = bestSeller.title.replace(/\s+/g, '-');
                this.itemTitleBestSellers.push(title);
            })
            this.showSpinner = false;
        })

        //get all new arrivals
        this.itemSvc.getItemsList({
            orderByChild: 'isNewArrival',
            equalTo: true,
            limitToLast: 4
        }).subscribe(newArrivals => {
            this.newArrivals = newArrivals;
            newArrivals.forEach(newArrival => {
                var title = newArrival.title.replace(/\s+/g, '-');
                this.itemTitleNewArrivals.push(title);
            })
            this.showSpinnerJustIn = false;
        })

        // if the image in the window of browser when the page is loaded, show that image
        $(document).ready(function(){
            this.showImages('.star');
        });

        // if the image in the window of browser when scrolling the page, show that image
        window.addEventListener('scroll', this.scroll, true);

    }

    scroll = (): void => {
        this.showImages('.star');
    }

    showImages(el) {
        var windowHeight = $(window).height();
        $(el).each(function () {
            var thisPos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (topOfWindow + windowHeight - 200 > thisPos) {
                $(this).addClass("animated");
                $(this).addClass("fadeIn");
            }
        });
    }

}
