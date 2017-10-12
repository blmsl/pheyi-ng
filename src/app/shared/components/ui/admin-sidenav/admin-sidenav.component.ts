import { Component, OnInit } from '@angular/core';
import { AdminService } from "app/shared/services/admin.service";


@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

  constructor(private adminSvc : AdminService) { }

  ngOnInit() {
  }

  showCategory(){
    this.adminSvc.setCategoryMenuState(true);
    this.adminSvc.setItemMenuState(false);
  }

  showItems(){
    this.adminSvc.setCategoryMenuState(false);
    this.adminSvc.setItemMenuState(true);
  }

}
