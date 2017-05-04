import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
  isAdding : boolean;
  itemIsEmpty : boolean;

  constructor(private af : AngularFire, private router : Router) {

   this.isAdding = false;

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

   
   }

  ngOnInit() {

    //item data store
    this.items = this.af.database.list('/items');


    //create form
    this.createItemForm = new FormGroup({
      'title' : new FormControl(null, Validators.required),
      'imageURL' : new FormControl(null, [Validators.required, Validators.pattern('https?://.+')]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'quantityInStock':new FormControl(null, Validators.required),
      'isBestSeller':new FormControl(null),
      'isNewArrival': new FormControl(null)
    })

   
  }
 
  createItem(){
   
    this.items.push({
      title : this.createItemForm.value.title,
      imageURL : this.createItemForm.value.imageURL,
      description : this.createItemForm.value.description,
      price : this.createItemForm.value.price,
      quantityInStock : this.createItemForm.value.quantityInStock,
      isBestSeller : this.createItemForm.value.isBestSeller,
      isNewArrival : this.createItemForm.value.isNewArrival,
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

  onAdding(){
    this.isAdding = true;
  }

  onCloseAdding(){
    this.isAdding =false;
  }
}
