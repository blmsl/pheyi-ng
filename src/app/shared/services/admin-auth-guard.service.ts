import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { AuthService } from "app/shared/services/auth.service";
import 'rxjs/add/operator/map';
import { UserService } from "app/shared/services/user.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() : Observable<boolean>{

     return this.auth.appUser$
          .map(appUser => appUser.isAdmin);
  }

}
