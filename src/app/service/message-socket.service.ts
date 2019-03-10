import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../model/message';
import {User} from '../model/user';
import {Entity} from '../model/entity';
import {Room} from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  // Events received
  errorJoin = this.socket.fromEvent<any>('errorJoin');
  newPerson = this.socket.fromEvent<string>('newPerson');
  messageReceived = this.socket.fromEvent<Message>('newMessageReceived');
  adminMessageReceived = this.socket.fromEvent<Message>('newMessageReceivedAdmin');
  buttonList1 = this.socket.fromEvent<string>('buttonList1');
  buttonList2 = this.socket.fromEvent<string>('buttonList2');
  adminSentMeAnAlert = this.socket.fromEvent<Message>('adminSentMeAnAlert');

  constructor(private socket: Socket) {
    this.adminSentMeAnAlert.subscribe(data => {
      console.log("admin sent an alert : " + data);
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  quitRooms(): void {
    this.socket.emit('quitRoom');
  }

  joinRoom(user: User, room: Room) : void {
    let userSent = {
      id: user.id,
      token: user.tokenWS,
      pseudo: user.pseudo
    };
    let entity: Entity = {
      user: userSent,
      room: room
    };
    this.socket.emit('onJoin', entity);
  }

  sendMessage(message: Message) : void {
    this.socket.emit('messageSent', message);
  }

}
