import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from './providers/services/userauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,public userAuth:UserauthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.userAuth.profile().subscribe(
      (res) => {
        this.userAuth.userData = res.data
        this.userAuth.isAuthed = true
      },
      (err) => {
        this.router.navigate(['/login'])
      },
      () => { this.router.navigate(['/profile']) }
    )
    return true;
  }
}
