import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatDialogModule, MatAutocompleteModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import {environment} from '../environments/environment';
import {LoginPopupComponent} from './home/login-popup/login-popup';
import {NotifierModule} from 'angular-notifier';
import { MatProgressSpinnerModule } from '@angular/material';
import {customNotifierOptions} from './notifierModuleOptions';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomComponent } from './room/room.component';
import { PasswordRoomComponent } from './room/password-room/password-room.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './service/auth-gard.service';

const apiURL: string = environment.baseUrl;

const config: SocketIoConfig = { url: apiURL, options: {
    path: '/ws/socket.io/'
  }};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ChatComponent,
    LoginPopupComponent,
    RoomComponent,
    PasswordRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    VgCoreModule,
    VgControlsModule,
    MatDialogModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    NgbModule
  ],
  entryComponents: [
    LoginPopupComponent,
    PasswordRoomComponent
  ],
  providers: [ CookieService,
               AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
