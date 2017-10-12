import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from "app/shared/services/admin.service";
import { ProductService } from "app/shared/services/product.service";
import { Subscription } from "rxjs/Subscription";
import { Product } from "app/shared/models/app-products";
import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  products : Product[];
  subscription :Subscription;
  tableResource : DataTableResource<Product>;
  items : Product[] = [];
  itemCount : number;


  constructor(
    private adminSvc: AdminService,
    private productService : ProductService) { 

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
     
  }

  private initializeTable(products : Product []){

     this.tableResource = new DataTableResource(products);
        this.tableResource.query({ offset : 0 })
          .then(items => this.items = items);   
         this.tableResource.count()
            .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;

     this.tableResource.query(params)
          .then(items => this.items = items);   
  }

  filter(query: string){
    let filteredProducts = (query)?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
   //scroll to top on activation
    window.scrollTo(0,0);
  }
  
}
