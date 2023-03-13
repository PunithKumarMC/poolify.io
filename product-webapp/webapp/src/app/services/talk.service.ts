import { Injectable } from "@angular/core";
import Talk from "talkjs";

@Injectable({
  providedIn: "root"
})
export class TalkService {
  constructor() {}

  private currentTalkUser!: Talk.User

  async createTalkUser(applicationUser: { id: any; username: any; email?: string; photoUrl?: string; welcomeMessage?: string; role?: string; profilePictureUrl?: any; }) {
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.profilePictureUrl
    });
  }

  async createCurrentSession() {
    await Talk.ready;
    const user = {
      id: 1,
      username:localStorage.getItem("userName")!,
      email: localStorage.getItem("emailId")!,
      photoUrl: "https://demo.talkjs.com/img/alice.jpg",
      welcomeMessage: "Hey there! How are you? :-)",
      role: "booker"
    };
    const currentTalkUser = await this.createTalkUser(user);
    const session = new Talk.Session({
      appId: "tGNS2vVR",
      me: currentTalkUser
    });
    this.currentTalkUser = currentTalkUser;
    return session;
  }

  private async getOrCreateConversation(
    session: Talk.Session,
    otherApplicationUser: { id: any; username: any; email: string | undefined; photoUrl: string | undefined; welcomeMessage: string | undefined; role: string | undefined; profilePictureUrl?: any; }
  ) {
    const otherTalkUser = await this.createTalkUser(otherApplicationUser);
    const conversationBuilder = session.getOrCreateConversation(
      Talk.oneOnOneId(this.currentTalkUser, otherTalkUser)
    );
    conversationBuilder.setParticipant(this.currentTalkUser);
    conversationBuilder.setParticipant(otherTalkUser);
    return conversationBuilder;
  }

  user=localStorage.getItem("bookedDriverEmailId")?.split('@')[0];
  async createInbox(session: Talk.Session) {
    const otherApplicationUser = {
      id: 5,
      username: this.user,
      email: localStorage.getItem("bookedDriverEmailId")!,
      photoUrl: "product-webapp\webapp\src\assets\profile PIc.jpeg",
      welcomeMessage: "Hey, how can I help?",
      role: "booker"
    };
    const conversationBuilder = await this.getOrCreateConversation(
      session,
      otherApplicationUser
    );
    return session.createInbox({ selected: conversationBuilder });
  }
}
