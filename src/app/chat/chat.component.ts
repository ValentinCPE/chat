import { Component, OnInit } from '@angular/core';
import {Message} from '../model/message';
import {ChatApiService} from '../service/chat-api.service';
import {MessageSocketService} from '../service/message-socket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Room} from '../model/room';

@Component({
  selector: 'app-live',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public room: Room = new Room();
  public pseudo: string;
  public tokenWS: string;
  public users: string[] = [];
  public messages: Message[] = [];
  public messageTyped: string = '';

  private readonly notifier: NotifierService;

  constructor(private chatApiService: ChatApiService,
              private messageSocketService: MessageSocketService,
              private route: ActivatedRoute,
              private router: Router,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tokenWS = params['tokenWS'];
      let roomStorage = localStorage.getItem('room');

      if(this.tokenWS && roomStorage) {
        //Initialisation des routes WS
        this.room = JSON.parse(roomStorage);
        this.initWS();
      }else{
        this.errorWhenConnectingRoomWS(true);
      }
    });

    //Récupération des messages
   /* this.chatApiService.getMessages().subscribe(data => {
      if(data.data){
        this.messages.push(data.data);
      }
    }, error => {
      this.messages = [];
    }); */
  }

  private addMessage(message: Message) {
    console.log('Message received : ' + message);
    this.messages.push(message);
  }

  private newPersonArrived(pseudo: string) {
    this.users.push(pseudo);
  }

  private adminSentAMessage() {

  }

  private onButton1Clicked() {

  }

  private onButton2Clicked() {

  }

  private errorJoin(data: any) {
    console.error(data);
  }

  sendMessage() {
    let message: Message = {
      pseudo: this.pseudo,
      message: this.messageTyped
    };
    this.messageSocketService.sendMessage(message);
    this.messageTyped = '';
    console.log('Message sent : ' + message);
  }

  quitRoom(): void {
    localStorage.removeItem('room');
    this.messageSocketService.quitRooms();
    this.errorWhenConnectingRoomWS(false);
  }

  private initWS() {
    //Souscription aux WS
    this.messageSocketService.messageReceived.subscribe(data => {
      this.addMessage(data);
    });

    this.messageSocketService.newPerson.subscribe(data => {
        this.newPersonArrived(data);
    });

    this.messageSocketService.adminMessageReceived.subscribe(data => {
      this.adminSentAMessage();
    });

    this.messageSocketService.buttonList1.subscribe(data => {
      this.onButton1Clicked();
    });

    this.messageSocketService.buttonList2.subscribe(data => {
      this.onButton2Clicked();
    });

    this.messageSocketService.errorJoin.subscribe(data => {
      this.errorJoin(data);
    });

    this.messageSocketService.joinRoom(this.chatApiService.getUser(), this.room);
  }

  private errorWhenConnectingRoomWS(isError: boolean) {
    this.notifier.notify((isError ? 'error' : 'success'), 'Vous êtes déconecté(e) du salon', 'ROOM_LOGOUT');
    this.router.navigate(['rooms']);
  }

}
