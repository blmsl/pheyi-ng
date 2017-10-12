import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { Product } from 'shared/models/app-products';

@Injectable()
export class ProductService {

  constructor(private db : AngularFireDatabase, private afAuth : AngularFireAuth) { }

  create(product : Product){
    product.addedBy = this.afAuth.auth.currentUser.email;    
    return this.db.list('/items').push(product);
  }

  getAll(){
    return this.db.list('/items');
  }

  get(productId){
    return this.db.object('/items/' + productId);
  }

  update(productId, product: Product){
    return this.db.object('/items/' + productId).update(product);
  }

  delete(productId){
     return this.db.object('/items/' + productId).remove();
  }

  isSoldOut(productId) : Observable<boolean>{
    return this.get(productId).map(item => {
      return item ? item.isSoldOut : false; 
    })
  }
}
