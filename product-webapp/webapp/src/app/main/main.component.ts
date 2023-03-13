import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, timeInterval, timeout } from 'rxjs/operators';

import { ConnectionService } from '../services/connection.service';
import { User } from '../Model/user';
import { __values } from 'tslib';
import { Save } from '../Model/save';

import { driverDetails } from '../Model/driverDetails';
import { passengerDetails } from '../Model/passengerDetails';
import { DatePipe, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MapDirectionsService } from '@angular/google-maps';
import { Injectable, NgZone } from '@angular/core';
// import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { HttpClient } from '@angular/common/http';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { UserDetails } from '../Model/userDetails';
import { personalDetails } from '../Model/personalDetails';
import { WalletServiceService } from '../services/wallet-service.service';
import { WalletComponent } from '../wallet/wallet.component';
import { MatDialog } from '@angular/material/dialog';
import { bookingHistory } from '../Model/bookingHistory';
import { PaymentMediumComponent } from '../payment-medium/payment-medium.component';
import { BookedHistoryService } from '../services/booked-history.service';
import { Router } from '@angular/router';
import { rideFinshed } from '../Model/rideFinished';
import { RideNotificationService } from '../services/ride-notification.service';
import { rideFinshedArray } from '../Model/rideFinishedArray';
import { RideFinishedDialogComponent } from '../ride-finished-dialog/ride-finished-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'rou';
  formattedaddress = ' ';

  options = {
    types: ['address'],
    componentRestrictions: { country: ['IN'] },
  } as unknown as Options;

  public AddressChange(address: any) {
    //setting address from API to local variable

    this.formattedaddress = address.formatted_address;
  }

  center: google.maps.LatLngLiteral = {
    lat: 12.78,
    lng: 76.55,
  };
  zoom = 9;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  user: User = new User('', '');
  save: Save = new Save('', '');
  value: boolean = true;
  toggle!: boolean;

  newMap: boolean = true;
  next: boolean = true;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  message: any | undefined;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, `0`);
  mm = String(this.today.getMonth() + 1).padStart(2, `0`); //January is 0!
  yyyy = this.today.getFullYear();
  date = this.mm + `/` + this.dd + `/` + this.yyyy;
  timestamp: any = this.today.getHours() + ':' + this.today.getMinutes();
  serviceType!: String;
  reqinsuranace!: boolean;
  clickTOPay:any;
  driverDetails: driverDetails = new driverDetails(
    `${localStorage.getItem('emailId')}`,
    0,
    'CarDriver',
    this.date,
    this.timestamp,
    '',
    '',
    false
  );
  passengerDetails: passengerDetails = new passengerDetails(
    `${localStorage.getItem('emailId')}`,
    0,
    'passenger',
    this.date,
    this.timestamp,
    false,
    '',
    '',
    '',
    '',
    false
  );

  // userDetails:UserDetails=new UserDetails("","","");
  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: ConnectionService,
    private httpclient: HttpClient,
    mapDirectionsService: MapDirectionsService,
    private wallet: WalletServiceService,
    public dialog: MatDialog,
    private bookedHistory: BookedHistoryService,
    private rideDone: RideNotificationService,
    private router: Router
  ) {
    // localStorage.setItem("emailId", "kkk@gmail.com");
    // this.ngOnInit();
  }
  //to show wallet and its balance
  // tranactions:any=[] ;
  // Wbalance:any;
  Comptoggle: boolean = false;
  public bookToggle() {
    this.Comptoggle = !this.Comptoggle;
  }

  openPaymentMedium() {
    let dialogRef = this.dialog.open(PaymentMediumComponent, {
      width: '45%',
      height: 'auto',
    });
    // setTimeout(() => {
    //   this.dialog.closeAll();
    // }, 4000);
  }

  addMoney() {
    const dialogRef = this.dialog.open(WalletComponent, {
      width: '45%',
      height: 'auto',
    });
  }

  message1:any;
  walletBal:any;
  typeOfUser:string='';

  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  ngOnInit(): void {
    this.wallet.getTransactionHistory().subscribe((result) => {
      let x = result.transactionHistory.reverse();
      this.walletBal = x[0];
    });


   setInterval(()=>this.service.getUsersByEmail(localStorage.getItem("emailId")!).subscribe(result=>{  localStorage.setItem("userName",result.updateDetails.firstName);
   localStorage.setItem("userContact",result.updateDetails.contactNo);

          this.receivedImageData=result.profilePhoto;
           this.base64Data=this.receivedImageData.pic;
           this.convertedImage='data:image/jpeg;base64,'+this.base64Data;
   localStorage.setItem("profilePhoto",this.convertedImage);
   localStorage.setItem("userType",result.updateDetails.userType);
  console.log("first name"+result.updateDetails.firstName)
  }),4000);

    this.checkUserType();
    setTimeout(() => {
      console.log('wihtin get user tupe ng onit');
      this.getUserType();
    }, 1000);
    this.checkingUserForLandingPage();
    setTimeout(() => {
      this.takeToNextPage();
    }, 10000);


    setTimeout(() => {
      this.getMappedRideforUser();
    }, 5000);

    this.rideDone.deletePassengerGotNotification().subscribe();

    this.clickTOPay="disabled";
    localStorage.setItem("clickToPay",this.clickTOPay);

    throw new Error('Method not implemented.');
  }

  public findDistance() {
    console.log('dist' + this.user.start);
    let resp = this.service.sendPlaceNames(this.user.start, this.user.end);
    resp.subscribe((data) => {
      this.message = JSON.stringify(data);
      console.log(JSON.stringify(data));
    });

    

  }
  onToggleDisplay() {
    this.value = !this.value;
  }
  driverClientToggle: boolean = false;
  onToggleDriver() {
    if (this.typeOfUser.charAt(0) == 'O') {
      this.toggle = !this.toggle;
      if (this.toggle) {
        localStorage.setItem('drivertoggleClient', 'false');
        console.log('within toogle setItem' + this.toggle);
      } else {
        localStorage.setItem('drivertoggleClient', 'true');
        console.log('within toogle setItem' + this.toggle);
      }
    } else {
      this.toggle = !this.toggle;
    }
  }
  price: any;
  emailId!: any;
  emailArray = [];
  //getting no of drivers
  public sendDriverDetails() {
    let res = this.service.updateDriverBookingDetails(this.driverDetails);
    res.subscribe((d) => {
      console.log('sent driver details' + d);
    });
    console.log('within driver');
    // let response=this.service.sendDriverPlaces(this.user.start,this.user.end);
    // response.subscribe(d=>{
    //   console.log(d);
    // })

    let distance = this.service.sendPlacesSaveDisatance(
      this.passengerDetails.fromPlace,
      this.passengerDetails.toPlace
    );
    distance.subscribe((d) => {
      console.log(d);
    });

    let response = this.service.sendDriverPlacesAndgetPassengers(
      this.driverDetails.fromPlace,
      this.driverDetails.toPlace
    );
    response.subscribe((d) => {
      console.log(d + 'check email');
      this.emailId = d + '';
      this.emailArray = this.emailId.split(',');
      this.emailArray.forEach((d) => console.log(d));
      console.log(d);
    });
    setTimeout(() => this.getPassengerDetails(), 5000);
    // this.price=document.getElementById("price");
  }
  // @ViewChild('cost')
  // cost!:ElementRef;
  // avgprice: any;
  // public codst() {
  //   this.avgprice = (<HTMLButtonElement>document.getElementById('price')).value;

  //   // const newprice=this.cost.nativeElement.value;
  //   // this.passengerDetails.price=newprice;
  //   console.log(this.avgprice + ' price ');
  // }

  // getting no of passengers
  public sendpassengerDetails() {
    let p = this.passengerDetails.vehicleType;
    localStorage.setItem('vehicleType', p);
    let res = this.service.updatePassengerBookingDetails(this.passengerDetails);
    res.subscribe((d) => {
      console.log('sent driver details ' + JSON.stringify(d));
    });

    let distance = this.service.sendPlacesSaveDisatance(
      this.passengerDetails.fromPlace,
      this.passengerDetails.toPlace
    );
    distance.subscribe((d) => {
      console.log(d) + 'distance';
    });

    let response = this.service.sendPassengerPlacesAndgetDrivers(
      this.passengerDetails.fromPlace,
      this.passengerDetails.toPlace
    );
    response.subscribe((d) => {
      console.log(d + 'check email');
      this.emailId = d + '';
      this.emailArray = this.emailId.split(',');
      this.emailArray.forEach((d) => console.log(d));
      console.log(d);
    });
    setTimeout(() => this.getDriverDetails(), 5000);
  }
  public text = 'a';
  element: HTMLElement | undefined;
  public addSpace() {
    this.element = document.getElementById('end') as HTMLElement;
    this.user.end += this.text;
    this.element.innerHTML += this.text;
    console.log(' value ' + this.element.innerHTML + this.user.end);
  }
  @ViewChild('addressInput')
  addressInput!: ElementRef;

  @ViewChild('addressInput1')
  addressInput1!: ElementRef;

  submit(): void {
    // here you can now get the full input string:
    const inputValue = this.addressInput.nativeElement.value;
    this.driverDetails.toPlace = inputValue;
    this.passengerDetails.toPlace = inputValue;
    const inputValue1 = this.addressInput1.nativeElement.value;
    this.driverDetails.fromPlace = inputValue1;
    this.passengerDetails.fromPlace = inputValue1;

    localStorage.setItem('fromPlace', inputValue1);
    localStorage.setItem('toPlace', inputValue);
    this.service.sendPlaceNames(inputValue1, inputValue);
    console.log('from ' + localStorage.getItem('fromPlace'));
    console.log('to ' + localStorage.getItem('toPlace'));
  }
  mapToggle() {
    this.newMap = !this.newMap;
  }
  nextToggle() {
    this.next = !this.next;
  }
  userdetails!: UserDetails;
  msg: any;

  // arr!:Array<UserDetails>[];
  driverEmailId: Array<string> = [];
  driverName: Array<string> = [];
  driverlastName: Array<string> = [];
  driverGender: Array<string> = [];
  driverPhoto: Array<string> = [];
  deriverVehicleName: Array<string> = [];

  personalDetails: personalDetails = new personalDetails();

  public getDriverDetails() {
    console.log('get driver email');
    this.emailArray.forEach((i) => {
      console.log(i + 'check email is');
      let user = this.service.getUsersByEmail(i);
      user.subscribe((d) => {
        if (!this.driverEmailId.includes(d.email)) {
          this.driverEmailId.push(d.email);
          this.driverName.push(d.updateDetails.firstName);
          console.log(this.driverName.length);
          console.log(d.updateDetails.firstName);
          this.driverGender.push(d.updateDetails.gender);
          console.log(d.updateDetails.gender);

          this.service.getUsersByEmail(d.email).subscribe(result=>{
            this.receivedImageData=result.profilePhoto;
           this.base64Data=this.receivedImageData.pic;
           this.convertedImage='data:image/jpeg;base64,'+this.base64Data;
           this.driverPhoto.push(this.convertedImage);
          })


          // this.driverPhoto.push(d.updateDetails)
          // this.deriverVehicleName.push(d.updateDetails.vehicleDetails.vehName)
        }
      });
    });
    this.driverName.forEach((d) => console.log(d + 'names'));
  }
  passengerEmailId: Array<string> = [];
  passengerName: Array<string> = [];
  passengerLastName: Array<string> = [];
  passengerGender: Array<string> = [];
  passengerPhoto: Array<string> = [];
  passengerVehicleName: Array<string> = [];

  getPassengerDetails() {
    console.log('get passenger emai');
    this.emailArray.forEach((i) => {
      console.log(i + 'check email is');
      let user = this.service.getUsersByEmail(i);
      user.subscribe((d) => {
        if (!this.passengerEmailId.includes(d.email)) {
          this.passengerEmailId.push(d.email);
          this.passengerName.push(d.updateDetails.firstName);
          this.passengerLastName.push(d.updateDetails.lastName);
          console.log(this.passengerName.length);
          console.log(d.updateDetails.firstName);
          this.passengerGender.push(d.updateDetails.gender);
          console.log(d.updateDetails.gender);


          this.service.getUsersByEmail(d.email).subscribe(result=>{
            this.receivedImageData=result.profilePhoto;
           this.base64Data=this.receivedImageData.pic;
           this.convertedImage='data:image/jpeg;base64,'+this.base64Data;
           this.passengerPhoto.push(this.convertedImage);
          })



          // this.passengerPhoto.push(d.updateDetails.profilePhoto)
          // this.passengerVehicleName.push(d.updateDetails.vehicleDetails.vehName)
        }
      });
    });
    this.passengerName.forEach((d) => console.log(d + 'names'));
  }

  togglediv = false;
  public getPassengerEmailId(integer: any) {
    this.togglediv = true;
    console.log(this.passengerEmailId[integer]);
    localStorage.setItem(
      'bookedPassengerEmailId',
      this.passengerEmailId[integer]
    );
  }
  public getDriverEmailId(integer: any) {
    console.log(this.driverEmailId[integer]);
    localStorage.setItem('bookedDriverEmailId', this.driverEmailId[integer]);
  }

  //checking the user as Owner Or Passenger for Toggling Option
  checkingUser!: boolean;
  public getUserType() {
    console.log('get USer Type' + this.typeOfUser);
    if (this.typeOfUser.charAt(0) == 'O') {
      console.log('inside if');
      this.checkingUser = true;
    } else {
      this.checkingUser = false;
      this.toggle = !this.toggle;
      console.log('inside else');
    }
    console.log(this.checkingUser + 'check');
  }

  public alertFunction(){
    alert("Update Your Existing Profile as Driver to Popl your Car")
  }

  bool!: boolean;
  public checkUserType() {
    this.service
      .getUsersByEmail(localStorage.getItem('emailId')!)
      .subscribe((d) => {
        console.log(
          'email get user by email' + localStorage.getItem('emailId')
        );
        this.typeOfUser = d.updateDetails.userType;
        if (this.typeOfUser.charAt(0) == 'O') {
          this.bool = false;
        } else {
          this.bool = true;
        }
        console.log(this.typeOfUser + ' type of user');
      });
  }

  userType: any;
  checking: any;
  public checkingUserForLandingPage() {
    console.log('get USer Type' + this.typeOfUser);
    if (this.typeOfUser.charAt(0) == 'O') {
      console.log('inside if');
      this.toggle = true;
    } else if (this.typeOfUser.charAt(0) == 'C') {
      this.toggle = false;
      console.log('inside else');
    }
    console.log(this.toggle + 'check');
  }

  updateNoOfSeats!: any;

  public sendupdateNoOfSeats() {
    this.updateNoOfSeats = this.passengerDetails.noOfSeatsRequired;
    console.log(this.updateNoOfSeats + 'update seats');
    this.service
      .sendUpdateNoOfSeatsToUser(this.updateNoOfSeats)
      .subscribe((d) => {
        console.log(d + 'update seats');
      });
  }

  //sending passenger and DriverEmaild   == when passenger selects the ride
  selectedDriverEmailId: any;
  public sendPassengerAndDriverDetails(integer: any) {
    this.selectedDriverEmailId = this.driverEmailId[integer];
    // this.service.sendDriverPassengerEmailId(this.selectedDriverEmailId,this.passengerDetails.noOfSeatsRequired).subscribe(d=>{
    //   console.log(d + "driverPassengerEmail")
    // })
  }

  noofSets: any;
  public sendDriverEmailId() {
    console.log('within sender email');
    this.noofSets = this.driverDetails.noOfSeatsRequired;
    console.log('seats ' + this.noofSets);
    this.service
      .sendDriverEmailIdRegister(this.noofSets)
      .subscribe
      // console.log(d + " send register")
      ();
  }

  public takeToNextPage() {
    if (this.driverEmailId == null) {
      this.router.navigateByUrl('/sidenav/after-booking-owner');
    }
  }

  public gotoAfterBooking() {
    this.router.navigateByUrl('/sidenav/after-booking-owner').then(() => {
      window.location.reload();
    });
  }
  // localStorage.getItem('emailId')!
  rideFinshedForThisPassenger!: [rideFinshedArray];
  public getMappedRideforUser() {
    console.log("within get MappedRideforUser")
    this.rideDone
      .getAllDriverForPassenger(localStorage.getItem('emailId')!)
      .subscribe((d) => {
        this.rideFinshedForThisPassenger=d.passengerBookings;
        console.log(d.passengerBookings[0].driverEmail+"----assigned value")
        this.rideFinshedForThisPassenger.forEach(e=>{
          console.log("within if for check")
          if(e.rideFinish=="yes"){
            localStorage.setItem("rideFinishedDriverEmail",e.driverEmail);
            console.log("checking ride finish")
            this.dialog.open(RideFinishedDialogComponent),{
              width: '45%',
              height: 'auto',
            }
            
          }
        });
        console.log(d.passengerBookings);
      });
  }

  updateData:any
  public updateDatabase(){
    this.updateData=localStorage.getItem("drivertoggleClient")
    if(this.updateData=="false"){
      console.log("type Of user if"+this.updateData)
      this.service.updateDatabaseForServiceType("passenger").subscribe(e=>console.log("done update"));
    }else{
      console.log("type of user else "+this.updateData)
      this.service.updateDatabaseForServiceType("CarDriver").subscribe(e=>console.log("done update"));
    }

  
  }


}
