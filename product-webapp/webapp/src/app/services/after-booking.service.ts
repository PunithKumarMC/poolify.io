import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../Model/userDetails';
import { passengerDetails } from '../Model/passengerDetails';
import { personalDetails } from '../Model/personalDetails';
import { vehicleDetails } from '../Model/vehicleDetails';
import { User } from '../Model/user';
import { bookingHistory } from '../Model/bookingHistory';
import { bookings } from '../Model/bookings';
import { rideDetails } from '../Model/rideDetails';

@Injectable({
  providedIn: 'root'
})
export class AfterBookingService {
  endPoint: string = "http://localhost:1112";
  endpoint1:string ="http://localhost:8081";
  baseUrl='https://poolify.stackroute.io'+'/user-registration-service';
  baseUrl1='https://poolify.stackroute.io'+'/user-booking-service';
  baseUrl2='https://poolify.stackroute.io'+'/booked-history';
  baseUrl3='https://poolify.stackroute.io'+'/ride-finished-notification';
  // baseUrl='http://localhost:8080'+'/user-registration-service';
  // baseUrl1='http://localhost:8080'+'/user-booking-service';
  // baseUrl2='http://localhost:8080'+'/booked-history';
  // baseUrl3='http://localhost:8080'+'/ride-finished-notification';
  constructor(private httpclient:HttpClient) { }

  public getDriverDetails(){
    // let api=`${this.endPoint}/getDataOfUser/${localStorage.getItem("emailId")}`;
    let api=`${this.baseUrl}/getDataOfUser/${localStorage.getItem("emailId")}`
    return this.httpclient.get(api);
  }

  public getCostOfRide():Observable<passengerDetails>{
    console.log("get cost "+ localStorage.getItem("bookedDriverEmailId"))
    // let api=`${this.endpoint1}/getDataOfUser/${localStorage.getItem("emailId")}` ;   //harcoded value
    let api=`${this.baseUrl1}/getDataOfUser/${localStorage.getItem("emailId")}`
    return this.httpclient.get<passengerDetails>(api)
  }

  public getuserName():Observable<UserDetails>{
    console.log("within get username")
    // let api=`${this.endPoint}/api/v2/getUserByEmail/${localStorage.getItem("bookedDriverEmailId")}`;
    let api=`${this.baseUrl}/api/v2/getUserByEmail/${localStorage.getItem("bookedDriverEmailId")}`
    return this.httpclient.get<UserDetails>(api);
  }
  public getpassengerName():Observable<passengerDetails>{
    console.log("within get passengername")
    // let api=`${this.endPoint}/api/v2/getUserByEmail/${localStorage.getItem("bookedPassengerEmailId")}`;
    let api=`${this.baseUrl}/api/v2/getUserByEmail/${localStorage.getItem("bookedPassengerEmailId")}`
    return this.httpclient.get<passengerDetails>(api);
  }

  public getVechileDetails(email:any):Observable<UserDetails>{
    // let api =`${this.endPoint}/api/v2/getUserByEmail/${localStorage.getItem("bookedDriverEmailId")}`;
    let api = `${this.baseUrl}/api/v2/getUserByEmail/${localStorage.getItem("bookedDriverEmailId")}`
    return this.httpclient.get<UserDetails>(api);
  }
  
  public getVechileNo():Observable<vehicleDetails>{
    // let api =`${this.endPoint}/register/${localStorage.getItem("bookedPassengerEmailId")}`;
    let api = `${this.baseUrl}/register/${localStorage.getItem("bookedPassengerEmailId")}`
    return this.httpclient.get<vehicleDetails>(api);
  }

  
endpoint2:string="http://localhost:8085"
public sendDetailsToBookingHistory(bookingHistory:bookingHistory){
  const contentType = {'content-Type':'application/json'};
  console.log("within send booking histary");
  // let api=`${this.endpoint2}/api/v2/addHistory/${localStorage.getItem("emailId")}`;
  let api =`${this.baseUrl2}/api/v2/addHistory/${localStorage.getItem("emailId")}`;
  const jsonfile= JSON.stringify(bookingHistory);
  return this.httpclient.post(api,jsonfile,{'headers':contentType})
}
public sendRatingsToBookingHistory(bookingHistory:bookingHistory){
  const contentType = {'content-Type':'application/json'};
  console.log("within send rating ");
  // let api=`${this.endpoint2}/api/v2/addRating/${localStorage.getItem("emailId")}`;
  let api=`${this.baseUrl2}/api/v2/addRating/${localStorage.getItem("emailId")}`
  const jsonfile= JSON.stringify(bookingHistory);
  return this.httpclient.post(api,jsonfile,{'headers':contentType})
}
endpoint3="http://localhost:8998/api/rideDetails"
public getDetailsOfSelectedPassenger(){
  console.log("gei all passengers")
  // let api = `${this.endpoint3}/getAllPassengers/${localStorage.getItem("emailId")}`;
  let api=`${this.baseUrl3}/api/rideDetails/getAllPassengers/${localStorage.getItem("emailId")}`;
  return this.httpclient.get<rideDetails>(api)
}
endpoint4:string='http://localhost:1112'
public getUsersByEmail(email:string):Observable<UserDetails>{
  console.log("within user email" +email)
  // let api=`${this.endpoint4}/api/v2/getUserByEmail/${email}`;
  let api=`${this.baseUrl}/api/v2/getUserByEmail/${email}`
  return this.httpclient.get<UserDetails>(api);
}

public  getPlacesOfPassengersAfterBooking(email:any){
  console.log("get passengers after "+email)
  // let api=`${this.endpoint1}/getDataOfUser/${email}` ;
  let api=`${this.baseUrl1}/getDataOfUser/${email}`  
  return this.httpclient.get<passengerDetails>(api)
}




booking :bookings=new bookings()
public updatePassengerForDrivers():any{
  // let api = `${this.endpoint3}/updateBookings/${localStorage.getItem("bookedDriverEmailId")}`;
  let api =`${this.baseUrl3}/api/rideDetails/updateBookings/${localStorage.getItem("bookedDriverEmailId")}`
  this.booking.passengerId=localStorage.getItem("emailId");
  this.booking.rideFinished=false;
  return this.httpclient.post<any>(api,this.booking)
}

}
