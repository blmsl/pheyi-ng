import { Injectable } from '@angular/core';
import { ShippingAddress } from "app/ShippingAddress";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class ShippingService {
  countries: any;
  addressObtained: any;

  private basePath : string = '/shipping';
  shippingAddresses : FirebaseListObservable<ShippingAddress[]>
  shippingAddress : FirebaseObjectObservable<ShippingAddress>

  constructor(private db : AngularFireDatabase, private http: Http) { 
    // populate countries;
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(response =>{
      this.countries = response.json();
   })
  }

  create(address : ShippingAddress) : string{
    return this.shippingAddresses.push(address).key;
  }

  update(key:string, address){
    this.db.object('/shipping/'+key).update(address)
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

  getCountries(){
    return this.countries
  }

  checkShipping(userId){

    const itemPath = `${this.basePath}/${userId}`;
    this.shippingAddress = this.db.object(itemPath);

    return this.shippingAddress.map(shipping => {
      return shipping.name ? false : true;
    });
  }
}
