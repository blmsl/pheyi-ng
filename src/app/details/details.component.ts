import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  item: FirebaseObjectObservable<any>;
  AlsoLike: FirebaseListObservable<any[]>;
  key: string;
  

  constructor(private route: ActivatedRoute, private af: AngularFire) { }

  ngOnInit() {
    //  this.key  = this.route.snapshot.params['key'];

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
            limitToLast : 4
          }
        });

        // this.user.name = params['name'].replace(/\s+/g,'-');
      }
    );

  }



}
