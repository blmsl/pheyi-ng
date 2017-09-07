import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  reference : string;

  constructor(private route: ActivatedRoute) { 
    route.queryParamMap.subscribe(params => this.reference = params.get('reference'))
  }

  ngOnInit() {
    console.log(this.reference);
  }

}
