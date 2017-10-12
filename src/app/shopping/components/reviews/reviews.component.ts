import { Component, OnInit, Input } from '@angular/core';
import {FirebaseListObservable } from "angularfire2/database";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Review } from 'app/shared/models/review';
import { ReviewsService } from 'app/shopping/services/reviews.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() dressKey : string;

  reviewsForm : FormGroup;
  isSignedIn : boolean = true;
  reviews : FirebaseListObservable<any[]>;
  

  review: Review = new Review();

  constructor( private reviewSvc : ReviewsService) { }

  ngOnInit() {

   
   //get list of reviews by dress key
    this.reviews = this.reviewSvc.getReviewsList( 
      { orderByChild : 'dressKey', equalTo : this.dressKey});

    
    //Implement reviews  form
    this.reviewsForm = new FormGroup({
       'title': new FormControl(null, Validators.required),
       'email': new FormControl(null, [Validators.required, Validators.email]),
       'name': new FormControl(null, Validators.required),
       'rating': new FormControl( Validators.required),
       'reviews': new FormControl(null, Validators.required),
       'dressKey': new FormControl(this.dressKey)
    });
  }

  addReview(){
    this.reviewSvc.createReview(this.reviewsForm.value);
    this.reviewsForm.reset();
    alert('review has been added')
  }

}
