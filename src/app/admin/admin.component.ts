import { Component, OnInit } from '@angular/core';
import { AdminService } from "app/admin/shared/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showItems : boolean = this.adminSvc.getItemMenuState();
  showCategories : boolean = this.adminSvc.getCatgoryMenuState();

  constructor(private adminSvc: AdminService) { }

  ngOnInit() {
  }
  
}
