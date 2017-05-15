import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
import { Item } from './item';

@Injectable()
export class ItemsService {

  private basePath: string = '/items';

  pushKey : string;
  items: FirebaseListObservable<Item[]> = null;
  item: FirebaseObjectObservable<Item> = null;

  constructor(private af: AngularFire,
    private db: AngularFireDatabase) { }


  //return an observable list with optional query
  //you will usually use this from ngOnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(this.basePath, {
      query: query
    });
    return this.items;
  }

  //Return a single item
  getItem(key: string): FirebaseObjectObservable<Item> {
    const itemPath = `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath);
    return this.item;
  }

  createItem(item: Item): string {
    
    return this.items.push(item).key
      
  }

  updateItem(key: string, value: any): void {
    this.items.update(key, value)
      .catch(error => console.error(error));
  }

  deleteItem(key: string):void{
    this.items.remove(key)
      .catch(error => console.error(error));
  }

  deleteAll():void{
    this.items.remove()
      .catch(error => console.error(error));
  }

}
