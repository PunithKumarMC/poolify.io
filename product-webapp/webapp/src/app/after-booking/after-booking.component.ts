import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapDirectionsService } from '@angular/google-maps';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from '../services/connection.service';
import { AfterBookingService } from '../services/after-booking.service';
import { SendMailService } from '../services/send-mail.service';
import { bookingHistory } from '../Model/bookingHistory';
import { Dialog } from '@angular/cdk/dialog';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { WalletServiceService } from '../services/wallet-service.service';
@Component({
  selector: 'app-after-booking',
  templateUrl: './after-booking.component.html',
  styleUrls: ['./after-booking.component.css']
})
export class AfterBookingComponent implements OnInit  {
  toggle:boolean=true;

  constructor(private breakpointObserver: BreakpointObserver,
    private httpclient:HttpClient,private service:AfterBookingService,private dialog:Dialog,private wallet:WalletServiceService ) {
  
  }
  fromPlace:string=''
  toPlace:string=''
  vehicleType:string=''
  vehicleNo:string=''
  userName:string='';
  ngOnInit(): void {
    console.log("driver emailId "+localStorage.getItem("bookedDriverEmailId"));
    setTimeout(() => {
      this.wallet.SendMoneyToDriver(this.price).subscribe();
    }, 4000); 

    this.fromPlace=localStorage.getItem('fromPlace')!;
    this.toPlace=localStorage.getItem('toPlace')!;
    this.vehicleType=localStorage.getItem('vehicleType')!;
    this.userName=localStorage.getItem("userName")!;

    console.log(this.vehicleType+"vvvv")
    this.getVechileNumber()
    this.vehicleType=localStorage.getItem('vechiletype')!;
    this.vehicleNo=localStorage.getItem('vehNumber')!;

    console.log(this.vehicleType+"vvvv");

    setTimeout(()=>this.getPrice(),3000) ;

    setTimeout(()=>this.sendDetailsToBookingHistory(),4000) ;

    this.updatePassengerforDriver();
  }

  public geDriverDetails(){


  }
  vechicleNumber:any
  driverName:any
  phNo:any
  price:any
  passengerName:any
  public getpassengerName(){
    console.log("within passenger")
    this.service.getuserName().subscribe(d=>{
      console.log("owner name"+d.updateDetails.firstName);
      this.passengerName=d.updateDetails.firstName;
    })
  }
  showdata:boolean=true
  public getVechileNumber(){
    console.log("within number ")
    let res=this.service.getVechileDetails(localStorage.getItem("bookedDriverEmailId"));
    res.subscribe(d=>{
      this.vechicleNumber=d.updateDetails.vehicleDetails.vehNumber
      this.driverName=d.updateDetails.firstName;
      if(!this.driverName===null){
        this.showdata=false;
      }

      this.phNo=d.updateDetails.contactNo;
      console.log(d.updateDetails.vehicleDetails.vehNumber)
      console.log(this.vechicleNumber+"number")
    })
    console.log("within number ")
  }
  vehNumber:any

  public getVechileNo(){
    let res=this.service.getVechileNo();
    res.subscribe(d=>{
      this.vehNumber=d.vehNumber
      console.log(this.vehNumber)
    })
}

  public getPrice(){
    let res=this.service.getCostOfRide();
    res.subscribe(d=>{
      this.price=d.price;
      this.vehicleType=d.vehicleType;
      console.log(this.price+ "price");
    })
  }

  bookingHistory: bookingHistory=new bookingHistory()
  public sendDetailsToBookingHistory(){
console.log("within send booking history")
    this.bookingHistory.emailId=localStorage.getItem("emailId");
   this.bookingHistory.fromPlace.push(localStorage.getItem("fromPlace"));
   this.bookingHistory.toPlace.push(localStorage.getItem("toPlace"));
   this.bookingHistory.vehicleType.push(this.vehicleType);
   this.bookingHistory.vehNumber.push(this.vechicleNumber);
   this.bookingHistory.paymentMedium.push("online");
   this.bookingHistory.estimatedPrice.push(this.price);
   console.log(typeof(this.bookingHistory.fromPlace)+"fromplace")
    this.service.sendDetailsToBookingHistory(this.bookingHistory).subscribe(d=>{
      console.log(d+"after")
    })
  }

  alreadyBooked:any;
  public updatePassengerforDriver(){

    console.log("driver up")
    this.service.updatePassengerForDrivers().subscribe((d: any)=>{
      console.log(d.message + "up")
    },(Error:any)=>console.log(this.alreadyBooked='You are already booked with this Driver'))
  }

  callChat(){
    let dialogRef = this.dialog.open(UserChatComponent, {
      width: '45%',
      height: 'auto%',
    });
  }


}