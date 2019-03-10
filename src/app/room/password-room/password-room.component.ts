import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChatApiService} from '../../service/chat-api.service';
import {NotifierService} from 'angular-notifier';
import {Room} from '../../model/room';

@Component({
  selector: 'app-password-room',
  templateUrl: './password-room.component.html',
  styleUrls: ['./password-room.component.scss']
})
export class PasswordRoomComponent implements OnInit {

  public room: Room;
  public password: FormControl;
  public logging: boolean;
  private readonly notifier: NotifierService;

  constructor(private dialog: MatDialogRef<PasswordRoomComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private chatApiService: ChatApiService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.logging = false;
    this.room = this.data.room;
    this.password = new FormControl('');
  }

  buttonEnabled(): boolean {
    return this.password.value.length > 0;
  }

  connectRoom() {
    this.logging = true;
    this.chatApiService.joinRoom(this.room,this.password.value).subscribe(res => {
      this.notifier.notify('success', 'Salon ' + this.room.roomname + ' rejoint', 'CONNEXION');
      localStorage.setItem('room', JSON.stringify(this.room));
      this.dialog.close(res.message);
    }, error => {
      this.password.setValue('');
      let message = 'Impossible de se connecter au salon';
      if(error.error.message){
        message = error.error.message;
      }
      this.notifier.notify('error', message, 'ERREUR_CONNEXION_SALON');
      this.logging = false;
    });
  }

}
