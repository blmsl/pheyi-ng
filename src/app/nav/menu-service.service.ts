import { Injectable } from '@angular/core';

declare var jquery: any;
declare var $: any;


@Injectable()
export class MenuService {

  constructor() { }

  toggleAccount(){
     var toggleCart = $('a[href=#account]').trigger("click");
  }

  toggleShoppingCart(){
     var toggleCart = $('a[href=#cart]').trigger("click");
  }

  toggleMenu(){
     var toggleCart = $('a[href=#menu]').trigger("click");
  }
}
