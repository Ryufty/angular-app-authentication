import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { NotifyService } from './notify.service';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!(user && user.catchPhrase)),
      tap(loggedIn => {
        if (!loggedIn) {
          this.notify.update('You must be logged in and have a catch phrase!', 'error');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
