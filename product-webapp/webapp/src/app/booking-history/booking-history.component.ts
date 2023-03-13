import { Component, OnInit } from '@angular/core';
import { from, raceWith } from 'rxjs';
import { bookingHistory } from '../Model/bookingHistory';
import { AfterBookingService } from '../services/after-booking.service';
import { BookedHistoryService } from '../services/booked-history.service';

// export interface BookedElements {
//   fromPlace: string;
//   slNo: number;
//   toPlace:string;
//   vehicleType: string;
//   vehicleNumber: string;
//   totalPrice:string;
//   paymentMedium:string;
// }
// const BOOKED_DATA: BookedElements[] = [
//   {slNo: 1, fromPlace:" Banglore", toPlace:"Mysore" , vehicleType:"4 Seater", vehicleNumber:"KA 28 M 4962",totalPrice:"4906.02$",paymentMedium:"DebitCard"},
  
// ];



@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit{
  // displayedColumns: string[] = ['slNo', 'fromPlace', 'toPlace', 'vehicleType','vehicleNumber','totalPrice','paymentMedium'];
  // dataSource = BOOKED_DATA;
  constructor(private service:BookedHistoryService ) {
    
  }
  ngOnInit(): void {
    this.getDetails();
    throw new Error('Method not implemented.');
  }
  booking:bookingHistory=new bookingHistory();
  row:any
 
  public getDetails(){
    this.service.getBookedHistory().subscribe(d=>{
      if(d.fromPlace.length>0){
        this.booking=d;
        this.row=d.fromPlace.length
        console.log(this.row+"fromplase")
        console.log(d.fromPlace+"data")
        }
        else{
          this.booking.fromPlace="data unavailable";
          this.booking.toPlace="data unavailable";
          this.booking.estimatedPrice="not appplicable"
        }
    })
  }

}
