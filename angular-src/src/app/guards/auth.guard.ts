import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/authentication/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private authService:AuthService,
        private router:Router
    ){}

    canActivate(){
       if(this.authService.isLoggedIn()){
            return true
       }else{
        this.router.navigate(['/login'])
            return false
       }
    }

}