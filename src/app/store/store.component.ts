import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product.service";
import { CategoryService } from "app/category.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "app/models/app-products";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService, categoryService: CategoryService) {
      
    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })

    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
    //scroll to top on activation
    window.scrollTo(0,0);
  }

}
