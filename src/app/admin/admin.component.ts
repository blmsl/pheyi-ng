import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from "app/admin/shared/admin.service";
import { ProductService } from "app/product.service";
import { Subscription } from "rxjs/Subscription";
import { Product } from "app/models/app-products";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  products : Product[];
  filteredProducts : Product[];
  subscription :Subscription;

  showItems : boolean = this.adminSvc.getItemMenuState();
  showCategories : boolean = this.adminSvc.getCatgoryMenuState();

  constructor(
    private adminSvc: AdminService,
    private productService : ProductService) { 

    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
     
  }

  filter(query: string){
    this.filteredProducts = (query)?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
   
  }
  
}
