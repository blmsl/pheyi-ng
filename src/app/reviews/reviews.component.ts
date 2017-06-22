import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviewsForm : FormGroup;
  isSignedIn : boolean = true;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    

    //TODO: Implement reviews  form
    this.reviewsForm = new FormGroup({

    });
  }

}
