import { Component, OnInit } from '@angular/core';
import { CategoryService } from "app/shared/services/category.service";
import { ProductService } from "app/shared/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/app-products';

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
    this.categories$ = categoryService.getAll();

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
