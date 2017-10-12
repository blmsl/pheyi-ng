import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { ItemsService } from 'app/shopping/components/items/shared/items.service';
import { Item } from 'app/shopping/components/items/shared/item';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  user: firebase.User;
  itemAdding: any;
  createItemForm: FormGroup;
  // user: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;
  isAdding: boolean;
  itemIsEmpty: boolean;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private router: Router,
    private itemSvc: ItemsService) {

    this.isAdding = false;

    //check if user is authorized
    this.afAuth.authState.subscribe(authState => {
      if (authState) {
        this.user = authState;
        if (this.user.email !== "daniel.adigun@digitalforte.ng") {
          this.afAuth.auth.signOut();
          router.navigate(['']);
        }
      }
    })


  }
  item: Item = new Item();

  ngOnInit() {

    //item data store
    // this.items = this.af.database.list('/items');
    this.items = this.itemSvc.getItemsList();


    //create form
    this.createItemForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'imageURL': new FormControl(null, [Validators.required, Validators.pattern('https?://.+')]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'quantityInStock': new FormControl(null, Validators.required),
      'isBestSeller': new FormControl(null),
      'isNewArrival': new FormControl(null),
    
    });


  }

  createItem() {
    var pushKey = this.itemSvc.createItem(this.createItemForm.value);
    this.itemSvc.updateItem(pushKey, {addedBy : this.user.email, createdAt : new Date()});

    this.createItemForm.reset();
    alert('item has been added!');
  }

  removeItem($key: string) {
   this.itemSvc.deleteItem($key);
   alert('item removed');
  }

  updateItem($key: string) {

  }

  saveUpdate() {
    //save update
  }

  onAdding() {
    this.isAdding = true;
  }

  onCloseAdding() {
    this.isAdding = false;
  }
}
