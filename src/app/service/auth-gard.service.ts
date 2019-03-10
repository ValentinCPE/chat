import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ChatApiService} from './chat-api.service';
import {NotifierService} from 'angular-notifier';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  private readonly notifier: NotifierService;

  constructor(private chatApiService: ChatApiService,
              private _router: Router,
              notifierService: NotifierService,
              private cookieService: CookieService) {
    this.notifier = notifierService;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.chatApiService.getUser()) {
      return true;
    }

    let token = this.cookieService.get('user_cpe');
    if(token){
      //Get User
      this.chatApiService.setToken(JSON.parse(token));
      this.chatApiService.getUserApi().subscribe(user => {
        this.chatApiService.setUser(user);
        this._router.navigate(['rooms']);
        return true;
      }, error => {
        this.notifier.notify('error', 'Vous n\'êtes pas connecté(e)', 'NO_CONNEXION');
        this._router.navigate(['home']);
        return false;
      });
    }else{
      this.notifier.notify('error', 'Vous n\'êtes pas connecté(e)', 'NO_CONNEXION');
      this._router.navigate(['home']);
      return false;
    }
  }

}
