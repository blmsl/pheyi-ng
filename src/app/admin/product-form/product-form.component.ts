import { Component, OnInit } from '@angular/core';
import { CategoryService } from "app/category.service";
import { Product } from "app/models/app-products";
import { ProductService } from "app/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService : ProductService) { 

    //get all categories
    this.categories$ = categoryService.getCategories();

    //get route param this.id for edit
     this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).take(1).subscribe(p=> this.product = p);
  }

  save(product : Product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin']);
  }

  delete(){
    if(!confirm('are you sure you want to delete this product?')) return; 
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin']);
    
  }

  ngOnInit() {
  }

}
