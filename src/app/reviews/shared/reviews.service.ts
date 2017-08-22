import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Review } from "app/reviews/shared/review";


@Injectable()
export class ReviewsService {

  private basePath = "/reviews";
  pushKey : string ;

  reviews: FirebaseListObservable<Review[]> = null;
  review: FirebaseObjectObservable<Review> = null;

  constructor( private db: AngularFireDatabase) { }

  //return list of reviews
  getReviewsList(query = {}) : FirebaseListObservable<Review[]>{
    this.reviews = this.db.list(this.basePath, {
      query: query
    });

    return this.reviews;
  }

  //create a review and return the pushKey
  createReview(review: Review) : string{
    return this.reviews.push(review).key;
  }

  getReviewsByDress(dressKey : string){
    
  }

}
