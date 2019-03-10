import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Room} from '../model/room';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private apiURL: string = environment.baseUrl + '/api/chat';
  private clientId: string = 'chat';
  private clientPwd: string = 'chat-pwd';

  private headerToken: HttpHeaders;
  private user: User;

  constructor(private httpClient: HttpClient) {}

  setToken(data: any) {
    this.headerToken = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', data.token_type + ' ' + data.access_token);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserApi(): Observable<any> {
    return this.httpClient.get<User>(this.apiURL + '/users/getUser', {headers : this.headerToken});
  }

  joinRoom(room: Room, password: string) : Observable<any> {
    let params = {
      "idUser" : this.user.id,
      "roomName" : room.roomname,
      "passwordRoom" : password
    };
    return this.httpClient.post(this.apiURL + '/room/join', params);
  }

  isPseudoExists(pseudo: string) : Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/search?q=' + pseudo);
  }

  getMessages() : Observable<any> {
    return this.httpClient.get(this.apiURL + '/room/getMessages');
  }

  logIn(pseudo: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', pseudo)
      .set('password', password)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientPwd);
    return this.httpClient.post(this.apiURL + '/oauth/token', params);
  }

  getRooms(): Observable<any> {
    return this.httpClient.get<Room[]>(this.apiURL + '/room/getRooms');
  }

}
