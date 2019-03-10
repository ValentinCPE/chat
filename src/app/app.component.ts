import {Component, OnInit} from '@angular/core';
import {ChatApiService} from './service/chat-api.service';
import {NotifierService} from 'angular-notifier';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(private chatApiService: ChatApiService,
              notifierService: NotifierService,
              private cookieService: CookieService,
              private route: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {

  }

}
