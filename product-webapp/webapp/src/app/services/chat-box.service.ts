import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../Model/chatMessage';
import { ChatRoom } from '../Model/chatRoom';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  senderId = localStorage.getItem('loginId');
   recipientId = "";
   senderName = "";
   recipientName = "";
 
   constructor(private http:HttpClient) { }
    baseUrl='https://jobizard.stackroute.io'+'/chatroom-service';
  //  baseUrl="http://localhost:8080";
 
   public getMessages(senderId:any,recipientId:any):any{
    console.log("api calliomg");
     return this.http.get<ChatMessage[]>(this.baseUrl+"/messages/"+senderId+"/"+recipientId);
   }
 
   public getAllMessages() : Observable<ChatMessage[]>{
     return this.http.get<ChatMessage[]>(this.baseUrl+"/getall");
   }
 
   public postMessages(chats:ChatMessage){
    const contentType = {'content-Type':'application/json'}
const jsonfile= JSON.stringify(chats)
     return this.http.post<any>(this.baseUrl+"/chat",jsonfile,{'headers':contentType});
   }
 
   public getChatroom() : Observable<ChatRoom[]>{
     return this.http.get<ChatRoom[]>(this.baseUrl+"/getchatroom");
   }
  
}
