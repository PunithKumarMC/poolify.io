import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AfterBookingOwnerComponent } from './after-booking-owner/after-booking-owner.component';
import { AfterBookingComponent } from './after-booking/after-booking.component';
import { AuthGuard } from './auth/auth.guard';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FaqComponent } from './faq/faq.component';
import { GoogleMapTrafficComponent } from './google-map-traffic/google-map-traffic.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NewMusicComponent } from './new-music/new-music.component';
import { PaymentComponent } from './payment/payment.component';
import { RatingComponent } from './rating/rating.component';
import { RegisterComponent } from './register/register.component';

import { SideToggleComponent } from './side-toggle/side-toggle.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SuccessCompComponent } from './success-comp/success-comp.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  { path:"", redirectTo:"home", pathMatch:"full"},
  // { path: 'traffic', component: GoogleMapTrafficComponent },

  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'success',component:SuccessCompComponent},
  {path:'home',component:HomeComponent},
  {path:'chatbot',component:ChatbotComponent},
  {path:'chat',component:UserChatComponent},

  // ,
  // {path:'toolbar',component:ToolbarComponent},
  {path:'rating',component:RatingComponent,canActivate:[AuthGuard]},
  {path:'sidenav', component:SidenavComponent,canActivate:[AuthGuard],
  children:[
    { path: 'main', component: MainComponent },
    {path:'update-profile',component:UpdateProfileComponent},
  {path:'after-booking',component:AfterBookingComponent},
  {path:'after-booking-owner',component:AfterBookingOwnerComponent},
  {path:'music',component:NewMusicComponent},
  {path:'booking-history',component:BookingHistoryComponent},
  {path:'faq',component:FaqComponent},
  {path:'payment',component:PaymentComponent},
    {path:'wallet',component:WalletComponent},
    {path:'aboutUs',component:AboutUsComponent}
    
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
