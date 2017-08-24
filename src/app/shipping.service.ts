import { Injectable } from '@angular/core';
import { ShippingAddress } from "app/ShippingAddress";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class ShippingService {
  addressObtained: any;

  private basePath : string = '/shipping';
  shippingAddresses : FirebaseListObservable<ShippingAddress[]>
  shippingAddress : FirebaseObjectObservable<ShippingAddress>

  constructor(private db : AngularFireDatabase) { }

  create(address : ShippingAddress) : string{
    return this.shippingAddresses.push(address).key;
  }

  update(key:string, address: ShippingAddress){
     this.shippingAddresses.update(key, address)
       .catch(error => console.error(error));;
  }

  get(query : {}){
    this.shippingAddresses = this.db.list(this.basePath, {
      query : query
    })
    return this.shippingAddresses
  }

  getSingle(key: string) : FirebaseObjectObservable<ShippingAddress>{
    const itemPath = `${this.basePath}/${key}`;
    this.shippingAddress = this.db.object(itemPath);
    return this.shippingAddress;
  }
}
