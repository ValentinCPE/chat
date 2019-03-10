import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ChatComponent} from './chat/chat.component';
import {RoomComponent} from './room/room.component';
import {AuthGuard} from './service/auth-gard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent  },
  { path: 'rooms', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'chat/:tokenWS', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
