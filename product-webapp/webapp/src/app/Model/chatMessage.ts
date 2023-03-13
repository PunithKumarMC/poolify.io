import { MessageStatus } from "./messageStatus";
export class ChatMessage{
    
        public emailId:string|undefined;
        public id:string|undefined;
        public chatId:string|undefined;
        public  senderId:string|undefined;
        public  recipientId:string|undefined;
        public  senderName:string|undefined;
        public  recipientName:string|undefined;
        public  message:string|undefined;
        public  timestamp:string|undefined;
        
        
        
        constructor(){}
}