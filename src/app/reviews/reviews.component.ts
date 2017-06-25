import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Review } from "app/reviews/shared/review";
import { ReviewsService } from "app/reviews/shared/reviews.service";


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviewsForm : FormGroup;
  isSignedIn : boolean = true;
  reviews : FirebaseListObservable<any[]>;

  review: Review = new Review();

  constructor(private af: AngularFire, private reviewSvc : ReviewsService) { }

  ngOnInit() {
    
    this.reviews = this.reviewSvc.getReviewsList();

    //TODO: Implement reviews  form
    this.reviewsForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
       'email': new FormControl(null, [Validators.required, Validators.email]),
       'name': new FormControl(null, Validators.required),
       'rating': new FormControl( Validators.required),
       'reviews': new FormControl(null, Validators.required),
    });
  }

  addReview(){
    this.reviewSvc.createReview(this.reviewsForm.value);
    this.reviewsForm.reset();
    alert('review has been added')
  }

}
