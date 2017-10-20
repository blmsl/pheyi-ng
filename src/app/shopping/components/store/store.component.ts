import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/shared/services/product.service";
import { CategoryService } from "app/shared/services/category.service";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs/Observable";
import { Product } from 'shared/models/app-products';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productTitles: string[] = [];
  categories$;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.populateProducts();    
  }

  private populateProducts(){
    
    this.productService
        .getAll().switchMap(products => {
            this.products = products;
            return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter(); 
    })
    this.categories$ = this.categoryService.getAll();
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;

    this.filteredProducts.forEach(product => {
      var title = product.title.replace(/\s+/g, '-');
      this.productTitles.push(title);
    })
  } 

}
