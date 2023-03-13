import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { LocationComponent } from './location/location.component';
import { GoogleMapTrafficComponent } from './google-map-traffic/google-map-traffic.component';
import { GoogleMapGroundOverlayComponent } from './google-map-ground-overlay/google-map-ground-overlay.component';
import { GoogleMapDirectionRendererComponent } from './google-map-direction-renderer/google-map-direction-renderer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionService } from './services/connection.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AfterBookingComponent } from './after-booking/after-booking.component';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { AfterBookingOwnerComponent } from './after-booking-owner/after-booking-owner.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapLocationPointerComponent } from './google-map-location-pointer/google-map-location-pointer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardComponent } from './components/card/card.component';
import { NewMusicComponent } from './new-music/new-music.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { RegisterServiceService } from './services/register-service.service';
import { FaqComponent } from './faq/faq.component';
import { PaymentComponent } from './payment/payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderService } from './services/order.service';
import { CommonModule } from '@angular/common';  
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import {MatTableModule} from '@angular/material/table';
import { WalletComponent } from './wallet/wallet.component';
import { RatingComponent } from './rating/rating.component'; 


 
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideToggleComponent } from './side-toggle/side-toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PaymentMediumComponent } from './payment-medium/payment-medium.component';
import { SuccessCompComponent } from './success-comp/success-comp.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { RideFinishedDialogComponent } from './ride-finished-dialog/ride-finished-dialog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TalkService } from './services/talk.service';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    MapMarkerComponent,
    LocationComponent,
    GoogleMapTrafficComponent,
    GoogleMapGroundOverlayComponent,
    GoogleMapDirectionRendererComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UpdateProfileComponent,
    AfterBookingComponent,
    AfterBookingOwnerComponent,
    GoogleMapLocationPointerComponent,
    SearchBarComponent,
    CardComponent,
    NewMusicComponent,
    FaqComponent,
    PaymentComponent,
    BookingHistoryComponent,
    WalletComponent,
    RatingComponent,
    SidenavComponent,
    SideToggleComponent,
    ToolbarComponent,
    PaymentMediumComponent,
    SuccessCompComponent,
    HomeComponent,
    ChatbotComponent,
    UserChatComponent,
    RideFinishedDialogComponent,
    AboutUsComponent,
    
  
  ],
  imports: [
    PickerModule,
    BrowserModule,
    GooglePlaceModule,
    AppRoutingModule,
    GoogleMapsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    NgxEmojiPickerModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  
    
    
  
  ],
  providers: [
    ConnectionService,
    RegisterServiceService,
    OrderService,
    TalkService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
