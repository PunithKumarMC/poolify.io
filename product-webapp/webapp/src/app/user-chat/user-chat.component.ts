import { Component, OnInit } from '@angular/core';

import Talk from "talkjs";
import { TalkService } from '../services/talk.service';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent {
    
  title = "client";
  private inbox!: Talk.Inbox;
  private session!: Talk.Session;

  constructor(private talkService: TalkService) {}

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    const session = await this.talkService.createCurrentSession();
    this.inbox = await this.talkService.createInbox(session);
    this.inbox.mount(document.getElementById("talkjs-container"));
  }




 
  //   getChats:ChatMessage[]=[];
  //   getAllChats:ChatMessage[]=[];
  
  //   sendChats: ChatMessage = new ChatMessage;
  
  
  //   getChatRoom:ChatRoom[]=[];
  //   receiverNames:ChatMessage[]=[];
    
  //   messages!:string[];
  //   text:any;
  
  //   receiverInitials!:string;
  
  //   today= new Date();
  //   jstoday = '';
  
  
  //   constructor(private chatService:ChatroomService) {
  
  //     this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  
  //     console.log(this.jstoday);
      
      
  //    }
  //    stringArray:any[]=[]; 
  //   ngOnInit(): void {
  //     this.chatService.getMessages(this.senderId,this.recipientId).subscribe((data)=>{
  //       this.getChats = data;
  //       this.getChats.reverse();
  //       this.receiverInitials = this.recipientId.charAt(0);
  //     })
  
  //     this.receiverInitials = this.recipientName.charAt(0);
  
  //     this.chatService.getAllMessages().subscribe((data)=>{
  //         console.log(data);
            
  //       // let 
  //       data.filter((e)=> e.senderId == this.senderId || e.recipientId == this.senderId).forEach((e)=>{
          
  //         if(!this.stringArray.includes(e.chatId)){
           
            
  //           this.stringArray.push(e.chatId);
  //           this.receiverNames.push(e);
  //         }
  //       }); 
           
  //     })
  
        
  //   }
    
  //  senderId = localStorage.getItem('loginId');
  //   recipientId = this.chatService.recipientId;
  //   senderName = this.chatService.senderName;
  //   recipientName = this.chatService.recipientName;
  //  sendMessage(){
  
  //     console.log(this.text);
  //     this.sendChats.senderId = this.senderId;    
  //     this.sendChats.senderName = this.senderName;
  //     this.sendChats.recipientId = this.recipientId;
  //     this.sendChats.recipientName = this.recipientName;
  //     this.sendChats.timestamp = this.jstoday;
  //     this.sendChats.message = this.text;
  //     console.log(this.sendChats);
      
  //     this.chatService.postMessages(this.sendChats).subscribe((data:any)=>{
  //       console.log(data);
  //       console.log(this.sendChats);
  //       this.text = "";
  //       this.ngOnInit();
  //     })
  //     this.ngOnInit();
  //     // this.chatMethod(this.senderId,this.recipientId);
  //   }
  
  
  //   selectedReceiver(receiver:any){
  //     console.log(receiver);
  //     if(this.senderId == receiver.senderId){
  //     this.chatService.getMessages(this.senderId,receiver.recipientId).subscribe((data:any)=>{
  //       this.recipientId = receiver.recipientId;
  //       this.senderName = receiver.senderName;
  //       this.getChats = data;
  //       this.getChats.reverse();
  //       this.recipientName = receiver.recipientId.split('@',2)[0];
  //       this.receiverInitials = receiver.recipientId.charAt(0);
  //     })
  //   }
  //   else{
  //     this.chatService.getMessages(receiver.recipientId,receiver.senderId).subscribe((data:any)=>{
  //       this.getChats = data;
  //       console.log(data);
  //       console.log(receiver.recipientId,receiver.senderId);
  //       this.recipientId = receiver.senderId;
  //       this.senderName = receiver.recipientName;
  //       this.getChats.reverse();
  //       this.recipientName = receiver.senderId.split('@',2)[0];
  //       this.receiverInitials = receiver.senderId.charAt(0);
  //     })
  //   }
    
  //   }
  
  //   chatMethod(senderId:string,receiverId:string){
  //     this.sendChats.senderId = senderId;    
  //     this.sendChats.recipientId = receiverId;
  //     this.chatService.getMessages(senderId,receiverId).subscribe((data:any)=>{
  //       this.getChats = data;
  //       this.getChats.reverse();
  //       this.recipientName = receiverId.split('@',2)[0];
  //       this.receiverInitials = receiverId.charAt(0);
  //     })
  //   }
//   onError:any;
//   public connect = () => {
//     const Stomp = require("stompjs");
//     var SockJS = require("sockjs-client");
//     SockJS = new SockJS("http://localhost:8080/ws");
//     stompClient = Stomp.over(SockJS);
//     stompClient.connect({}, this.onConnected, this.onError);
//   };
//   public onConnected = () => {
//     console.log("connected");

//     stompClient.subscribe(
//       "/user/" + currentUser.id + "/queue/messages",
//       onMessageReceived
//     );
//   };

//  public sendMessage = (msg:any) => {
//     if (msg.trim() !== "") {
//       const message = {
//         senderId: currentUser.id,
//         recipientId: activeContact.id,
//         senderName: currentUser.name,
//         recipientName: activeContact.name,
//         content: msg,
//         timestamp: new Date(),
//       };
        
//       stompClient.send("/app/chat", {}, JSON.stringify(message));
//     }
//   };

  }


