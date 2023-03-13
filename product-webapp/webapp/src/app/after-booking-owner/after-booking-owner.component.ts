import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { bookingHistory } from '../Model/bookingHistory';
import { bookings } from '../Model/bookings';
import { RatingComponent } from '../rating/rating.component';
import { AfterBookingService } from '../services/after-booking.service';
import { RegisterServiceService } from '../services/register-service.service';
import { RideNotificationService } from '../services/ride-notification.service';
import { SendMailService } from '../services/send-mail.service';

@Component({
  selector: 'app-after-booking-owner',
  templateUrl: './after-booking-owner.component.html',
  styleUrls: ['./after-booking-owner.component.css'],
})
export class AfterBookingOwnerComponent implements OnInit {
  toggle: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpclient: HttpClient,
    private service: AfterBookingService,
    private register: RegisterServiceService,
    private emailService: SendMailService,
    public dialog: MatDialog,
    private rideDone: RideNotificationService
  ) {}
  fromPlace: string = '';
  toPlace: string = '';
  vehicleType: string = '';
  vehicleNo: string = '';
  noOfSeatsBooked: number = 0;
  ngOnInit(): void {
    // this.fromPlace=localStorage.getItem('fromPlace')!;
    // this.toPlace=localStorage.getItem('toPlace')!;
    this.vehicleType = localStorage.getItem('vehicleType')!;
    console.log(this.vehicleType + 'vvvv');
    this.getVechileNumber();
    setTimeout(() => {
      this.getOwnerName();
    }, 3000);
    this.vehicleNo = localStorage.getItem('vehNumber')!;

    console.log(this.vehicleType + 'vvvv');

    setTimeout(() => this.getPrice(), 3000);

    setTimeout(() => this.sendDetailsToBookingHistory(), 4000);
    // setTimeout(()=>this.getNoOfSeatsRequired(),2000);

    this.getPooledPassengersDetailsForEndRide();
    setTimeout(() => {
      this.getdetails();
    }, 2000);
    setTimeout(() => {
      this.getPlaces();
    }, 2000);
  }

  vechicleNumber: any;
  passengerName: any;
  phNo: any;
  price: any;

  ownerName: any;
  public getOwnerName() {
    console.log('within owner');
    this.service.getuserName().subscribe((d) => {
      console.log('owner name' + d.updateDetails.firstName);
      this.ownerName = d.updateDetails.firstName;
    });
  }
  showdata: boolean = false;

  public getVechileNumber() {
    console.log('within number ');
    let res = this.service.getVechileDetails(
      localStorage.getItem('bookedPassengerEmailId')
    );
    res.subscribe((d) => {
      this.vechicleNumber = d.updateDetails.vehicleDetails.vehNumber;
      this.passengerName = d.updateDetails.firstName;
      if (!this.passengerName === null) {
        this.showdata = true;
      }
      this.phNo = d.updateDetails.contactNo;
      console.log(d.updateDetails.vehicleDetails.vehNumber);
      console.log(this.vechicleNumber + 'number');
    });
    console.log('within number ');
  }
  vehNumber: any;

  public getVechileNo() {
    let res = this.service.getVechileNo();
    res.subscribe((d) => {
      this.vehNumber = d.vehNumber;
      console.log(this.vehNumber);
    });
  }
  public getPrice() {
    let res = this.service.getCostOfRide();
    res.subscribe((d) => {
      this.price = d.price;
      this.fromPlace = d.fromPlace;
      this.toPlace = d.toPlace;
      console.log(this.price + 'price');
    });
  }

  bookingHistory: bookingHistory = new bookingHistory();
  public sendDetailsToBookingHistory() {
    console.log('within send booking history');
    this.bookingHistory.emailId = localStorage.getItem('emailId');
    this.bookingHistory.fromPlace.push(this.fromPlace);
    this.bookingHistory.toPlace.push(this.toPlace);
    this.bookingHistory.vehicleType.push(this.vehicleType);
    this.bookingHistory.vehNumber.push(this.vechicleNumber);
    this.bookingHistory.estimatedPrice.push(this.price);
    this.bookingHistory.paymentMedium.push('online');
    console.log(typeof this.bookingHistory.fromPlace + 'fromplace');
    this.service
      .sendDetailsToBookingHistory(this.bookingHistory)
      .subscribe((d) => {
        console.log(d + 'after');
      });
  }

  public getNoOfSeatsRequired() {
    this.service.getCostOfRide().subscribe((d) => {
      this.noOfSeatsBooked = d.noOfSeatsRequired;
    });
  }

  passengerSelected: Array<string> = [];
  public getPooledPassengersDetailsForEndRide() {
    this.service.getDetailsOfSelectedPassenger().subscribe((d) => {
      // console.log(d.booking + " getPooledPass")
      // console.log(d.booking.forEach(a=>this.passengerSelected.push(a)) + " getPooledPass")
      // console.log(this.passengerSelected.forEach(b=>{console.log(b.passengerId)}) + "aa")
      d.booking.forEach((b) => {
        this.passengerSelected.push(b.passengerId);
      });
      console.log(
        this.passengerSelected.forEach((b) => {
          console.log(b + 'names');
        })
      );
    });
  }

  originPlace: Array<string> = [];
  destinationPlace: Array<string> = [];
  phoneno: Array<any> = [];
  firstName: Array<string> = [];
  public getdetails() {
    console.log('within get details passengers');
    this.passengerSelected.forEach((b) => {
      console.log(b + 'email');
      this.service.getUsersByEmail(b).subscribe((d) => {
        console.log(d.updateDetails.contactNo + 'no');
        this.phoneno.push(d.updateDetails.contactNo);
        // console.log(d.updateDetails.contactNo + "no")
        this.firstName.push(d.updateDetails.firstName);
      });
    });
  }

  public getPlaces() {
    console.log('within get details passengers');
    this.passengerSelected.forEach((d) => {
      console.log(d + 'email');
      this.service.getPlacesOfPassengersAfterBooking(d).subscribe((b) => {
        console.log(b.fromPlace + 'place');
        this.originPlace.push(b.fromPlace);
        this.destinationPlace.push(b.toPlace);
      });
    });
  }

  public endRidePassenger(integer: number) {
    this.rideDone.endRide(localStorage.getItem('emailId'),this.passengerSelected[integer]).subscribe();
    this.emailService
      .sendEmailToPassengerForRideFinished(this.passengerSelected[integer])
      .subscribe((d) => {
        console.log(this.passengerSelected[integer] + 'email ID ');
        console.log(d + 'email sent');
      });
    let dialogRef = this.dialog.open(RatingComponent, {
      width: '45%',
      height: 'auto%',
    });
  }
}
