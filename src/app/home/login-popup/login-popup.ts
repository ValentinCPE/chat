import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ChatApiService} from '../../service/chat-api.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'login-popup',
  templateUrl: 'login-popup.html',
})
export class LoginPopupComponent implements OnInit {
  public pseudo: string;
  public password: FormControl;
  public logging: boolean;

  private readonly notifier: NotifierService;

  constructor(private dialog: MatDialogRef<LoginPopupComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private chatApiService: ChatApiService,
              private router: Router,
              notifierService: NotifierService,
              private cookieService: CookieService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.logging = false;
    this.pseudo = this.data.pseudo;
    this.password = new FormControl('');
  }

  buttonEnabled(): boolean {
    return this.password.value.length > 4;
  }

  logIn(): void {
    this.logging = true;
    this.chatApiService.logIn(this.pseudo,this.password.value).subscribe(data => {
      this.chatApiService.setToken(data);
      this.cookieService.set('user_cpe', JSON.stringify(data));
      this.dialog.close(true);

      //Get User
      this.chatApiService.getUserApi().subscribe(user => {
        this.chatApiService.setUser(user);
        this.notifier.notify('success', 'Vous êtes connecté(e)', 'CONNEXION');
      }, error => {
        this.notifier.notify('error', 'Problème serveur, réessayez plus tard', 'ERREUR_USER_RECUP');
        this.router.navigate(['home']);
      });

    }, error => {
      this.password.setValue('');
      this.notifier.notify('error', 'Mot de passe incorrect, essayez de nouveau !', 'ERREUR_CONNEXION');
      this.logging = false;
    });
  }

}
