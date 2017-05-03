import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemAdding: any;
  createItemForm : FormGroup;
  user : FirebaseAuthState;
  items : FirebaseListObservable<any[]>;

  constructor(private af : AngularFire, private router : Router) {

    //check if user is authorized
    this.af.auth.subscribe(authState => {
      if(authState){
        this.user = authState;
        if(this.user.auth.email !== "daniel.adigun@digitalforte.ng"){
          this.af.auth.logout();
          router.navigate(['']);       
        }
      }
    })

    //create form
    this.createItemForm = new FormGroup({
      'title' : new FormControl(null),
      'imageURL' : new FormControl(null),
      'description': new FormControl(null),
      'price': new FormControl(null),
      'quantityInStock':new FormControl(null),
      'isBestSeller':new FormControl(null),
      'isNewArrival': new FormControl(null)
    })

    //populate all items in db
    this.items = this.af.database.list('/items');

   }

  ngOnInit() {
  }
 
  createItem(){
    this.itemAdding = this.createItemForm.value;
    this.items.push({
      title : this.itemAdding.title,
      imageURL : this.itemAdding.imageURL,
      description : this.itemAdding.description,
      price : this.itemAdding.price,
      quantityInStock : this.itemAdding.quantityInStock,
      isBestSeller : this.itemAdding.isBestSeller,
      isNewArrival : this.itemAdding.isNewArrival,
      createdAt : (new Date()).toString(),
      addedBy : this.user.auth.email
    }).then( e=>{
      this.createItemForm.reset();
      alert('added new item');

    }).catch(error => {
      console.log('Error Adding Item: ', error);
      alert(error.message);
    });
  }

  removeItem($key : string){
    this.items.remove($key);  
  }

  updateItem($key : string){
    
  }

  saveUpdate(){
    //save update
  }
}
