import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { latlng } from '../Model/latlng';
import { personalDetails } from '../Model/personalDetails';
import { rideDetails } from '../Model/rideDetails';
import { User } from '../Model/user';
import { UserDetails } from '../Model/userDetails';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  baseUrl='https://poolify.stackroute.io'+'/user-booking-service';
  baseUrl1='https://poolify.stackroute.io'+'/ride-finished-notification';
  baseUrl2='https://poolify.stackroute.io'+'/user-registration-service';
  // baseUrl='http://localhost:8080'+'/user-booking-service';
  // baseUrl1='http://localhost:8080'+'/ride-finished-notification';
  // baseUrl2='http://localhost:8080'+'/user-registration-service';
  endPoint: String = "http://localhost:8081"
  constructor(private httpclient:HttpClient) { 

  }


  public sendPlaceNames(fromplace:any,toplace:any){
    // let api=`${this.endPoint}/getDistance?fromplace=${fromplace}&toplace=${toplace}&emailId=${localStorage.getItem("emailId")}`;
    let api=`${this.baseUrl}/getDistance?fromplace=${fromplace}&toplace=${toplace}&emailId=${localStorage.getItem("emailId")}`
    return this.httpclient.get(api);
  }

  public sendBookingDetails(){
    let api=`${this.endPoint}/saveUser`

  }

  public getLocationOfPlaces(places:any){
    // let api=`${this.endPoint}/getLocation?address=${places}`;
    let api=`${this.baseUrl}/getLocation?address=${places}`

    return this.httpclient.get(api);
  }

  public getAllusers():Observable<any>{
    // let api=`${this.endPoint}/getAllUsers`;
    let api=`${this.baseUrl}/getAllUsers`
    return this.httpclient.get(api);
  }
  
  //update driverdetails and get distance between places
  public sendPlacesSaveDisatance(fromplace:any,toplace:any){
    console.log("within send place and save distance")
    // let api=`${this.endPoint}/getDistance?fromplace=${fromplace}&toplace=${toplace}&emailId=${localStorage.getItem("emailId")}`;
    let api=`${this.baseUrl}/getDistance?fromplace=${fromplace}&toplace=${toplace}&emailId=${localStorage.getItem("emailId")}`;
    return this.httpclient.get(api);
  }
  //update driverdetails and get distance between places, get drivers list
  public sendPassengerPlacesAndgetDrivers(fromPlace:any,toPlace:any){
    console.log(localStorage.getItem("emailId")+"local storage");
    // let api=`${this.endPoint}/getDriversForPassengers?fromPlace=${fromPlace}&toPlace=${toPlace}&emailId=${localStorage.getItem("emailId")}`;
    let api = `${this.baseUrl}/getDriversForPassengers?fromPlace=${fromPlace}&toPlace=${toPlace}&emailId=${localStorage.getItem("emailId")}`
    return this.httpclient.get(api);
  }

  public sendDriverPlacesAndgetPassengers(fromPlace:any,toPlace:any){
    console.log(localStorage.getItem("emailId")+"local storage");
    // let api=`${this.endPoint}/getPassengersForDrivers?fromPlace=${fromPlace}&toPlace=${toPlace}&emailId=${localStorage.getItem("emailId")}`;
    let api=`${this.baseUrl}/getPassengersForDrivers?fromPlace=${fromPlace}&toPlace=${toPlace}&emailId=${localStorage.getItem("emailId")}`
    return this.httpclient.get(api);
  }


  //update the existing bookingId
  public updateDriverBookingDetails(driverDetails:any){
    console.log("wihtin update driver details")
    const contentType = {'content-Type':'application/json'}
    // let api=`${this.endPoint}/saveUser`;
    let api=`${this.baseUrl}/saveUser`
   const jsonfile= JSON.stringify(driverDetails)
    return this.httpclient.post(api,jsonfile,{'headers':contentType})
  }
  //update the existing bookingId
  public updatePassengerBookingDetails(passengerDetails:any){
    console.log("wihtin update passenger details")
    const contentType = {'content-Type':'application/json'}
    // let api=`${this.endPoint}/saveUser`;
    let api=`${this.baseUrl}/saveUser`
    const jsonfile= JSON.stringify(passengerDetails)
    return this.httpclient.post(api,jsonfile,{'headers':contentType});
  }

  // public getLocationForFromPlaceName(fromPlace:string):Observable<latlng>{
  //   let api =`${this.endPoint}/getLocation?address=${fromPlace}`
  //   return this.httpclient.get<latlng>(api);
  // }
  // public getLocationForToPlaceName(fromPlace:string){
  //   let api =`${this.endPoint}/getLocation?address=${fromPlace}`
  //   return this.httpclient.get<latlng>(api);
  // }

  public sendUpdateNoOfSeatsToUser(noOfSeats:any){
    // let api = `${this.endPoint}/updateSeats/${noOfSeats}/${localStorage.getItem("bookedDriverEmailId")}`
    let api = `${this.baseUrl}/updateSeats/${noOfSeats}/${localStorage.getItem("bookedDriverEmailId")}`
    return this.httpclient.put(api,{})
  }

  endpoint1:string='http://localhost:1112'
  public getUsersByEmail(email:string):Observable<UserDetails>{
    console.log("within user email")
    // let api=`${this.endpoint1}/api/v2/getUserByEmail/${email}`;
    let api=`${this.baseUrl2}/api/v2/getUserByEmail/${email}`
    return this.httpclient.get<UserDetails>(api);
  }


  //sending passenger and DriverEmaild   == when passenger selects the ride
  endpoint3='http://localhost:8998/api/rideDetails'
  public sendDriverPassengerEmailId(driverEmailId:any,seats:any){
    let api=`${this.endPoint}/`
  }

  rideDetails : rideDetails=new rideDetails()
  public sendDriverEmailIdRegister(seats :any){
    console.log("rigister email driver" + seats)
    this.rideDetails.driverId=localStorage.getItem("emailId");
    this.rideDetails.noOfSeats=seats;
    // let api=`${this.endpoint3}/registerDriver`;
    let api=`${this.baseUrl1}/api/rideDetails/registerDriver`
    return this.httpclient.post(api,this.rideDetails)
  }


  public updateDatabaseForServiceType(serviceType:any){
    console.log("within update database");
    let api = `${this.baseUrl}/updateDatabase/${localStorage.getItem("emailId")}/${serviceType}`;

    return this.httpclient.post(api,{});
  }

}
