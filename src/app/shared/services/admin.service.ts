import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  categoryMenuState : boolean = false;
  itemMenuState : boolean = true; //default view

  constructor() { }

  setCategoryMenuState(state : boolean){
    this.categoryMenuState = state;
  }

  setItemMenuState (state : boolean){
    this.itemMenuState = state;
  }


  getCatgoryMenuState(){
    return this.categoryMenuState;
  }

  getItemMenuState(){
    return this.itemMenuState;
  }
}
