import {Component, Inject, OnInit} from '@angular/core';
import {ChatApiService} from '../service/chat-api.service';
import {Room} from '../model/room';
import {DOCUMENT} from '@angular/common';
import {NotifierService} from 'angular-notifier';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {PasswordRoomComponent} from './password-room/password-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  private lockedImage = './../../assets/img/locked.gif';
  private unlockedImage = './../../assets/img/lockUnlocked.gif';

  public loading: boolean;
  public rooms: Room[] = [];

  private readonly notifier: NotifierService;

  constructor(@Inject(DOCUMENT) document,
              private chatApiService: ChatApiService,
              private dialog: MatDialog,
              private router: Router,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.loading = true;
    this.chatApiService.getRooms().subscribe(data => {
      this.rooms = data;
      this.rooms.forEach(room => {
        room.currentImage = room.image;
        room.statusImage = (room.password) ? this.lockedImage : this.unlockedImage;
      });
      this.loading = false;
      this.notifier.notify('success', 'Salon(s) récupéré(s)', 'ROOM_FETCHED');
    });
  }

  checkPasswordHover(room: Room) {
    room.currentImage = room.statusImage;
    room.isHovering = true;
  }

  hoverQuit(room: Room) {
    room.currentImage = room.image;
    room.isHovering = false;
  }

  roomChoosen(room: Room) {
    if(room.password){
      this.openPopupPassword(room);
    }
  }

  private openPopupPassword(room: Room): void {
    let dialogRef = this.dialog.open(PasswordRoomComponent, {
      data: { room: room },
    });

    dialogRef.afterClosed().subscribe(tokenWS => {
      if (tokenWS) {
        this.chatApiService.getUser().tokenWS = tokenWS;
        this.router.navigate(['/chat', tokenWS]);
      }
    });
  }

}
