import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatApiService} from '../service/chat-api.service';
import {Status} from '../model/Status';
import {MatDialog} from '@angular/material';
import {LoginPopupComponent} from './login-popup/login-popup';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public pseudo: FormControl;
  public charMinimumSuccess: boolean;
  public mailFormat: boolean;
  public cpeAdress: boolean;
  public connectOrCreate: Status;
  public pseudoPossible: string[] = [];

  constructor(private chatApiService: ChatApiService,
              private dialog: MatDialog,
              private router: Router) {}

  private checkPseudo(pseudo: string): void {

    this.charMinimumSuccess = pseudo.length >= 6;

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(pseudo))) {
      this.mailFormat = false;
    }else{
      this.mailFormat = true;
    }

    if (pseudo.indexOf('cpe') === -1) {
      this.cpeAdress = false;
    }else{
      this.cpeAdress = true;
    }

    this.chatApiService.isPseudoExists(pseudo).subscribe(data => {
      let resultsES = [];
      for (let result of data.message) {
        resultsES.push(result._source.pseudo);
      }
      this.pseudoPossible = resultsES;
      this.connectOrCreate = Status.Connect;
    }, notExists => {
      //this.pseudoAlreadyTook = notExists.error.code === 400;
      this.pseudoPossible = [];
      this.connectOrCreate = Status.Subscribe;
    });

  }

  ngOnInit() {
    this.connectOrCreate = Status.Connect;
    this.pseudo = new FormControl('');
    this.onChanges();
    this.checkPseudo(this.pseudo.value); //We execute the first time
  }

  onChanges(): void {
    this.pseudo.valueChanges.subscribe(value => this.checkPseudo(value));
  }

  canLogging(): boolean {
    return this.charMinimumSuccess && this.mailFormat && this.cpeAdress;
  }

  loggingIn(): void {
    let pseudo = this.pseudo.value;

    switch (this.connectOrCreate) {
      case Status.Connect:
        this.logInPopup(pseudo);
        break;

      case Status.Subscribe:

        break;
    }
  }

  enterPressed(event): void {
    if(event.key === "Enter"){
      this.loggingIn();
    }
  }

  private logInPopup(pseudo: string): void {
    let dialogRef = this.dialog.open(LoginPopupComponent, {
      data: { pseudo: pseudo },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/rooms']);
      }
    });
  }

}
