import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rideFinshed } from '../Model/rideFinished';

@Injectable({
  providedIn: 'root',
})
export class RideNotificationService {
  constructor(private http: HttpClient) {}
  baseUrl3='https://poolify.stackroute.io'+'/ride-finished-notification';
  // baseUrl3 = 'http://localhost:8080' + '/ride-finished-notification';

  // let api = `${this.endpoint3}/getAllPassengers/${localStorage.getItem("emailId")}`;
  // http://localhost:8998/api/rideDetails/endRide/driver_email(he is logged in so fetch it from localstorage)/give passenger email
  
  public endRide(driver_email:any,passengerEmail:any) {
    console.log("end ride  "+driver_email +" "+ passengerEmail)
    let api = `${this.baseUrl3}/api/rideDetails/endRide/${driver_email}/${passengerEmail}`;
   return this.http.post<any>(api, {});
  }
  
  // http://localhost:8998/api/rideDetails/getAllDriverForPassenger/test2@gmail.com
  //checking all driver mapped with the particular logged id
  
  public getAllDriverForPassenger(passengerEmail:any){
    let api = `${this.baseUrl3}/api/rideDetails/getAllDriverForPassenger/${passengerEmail}`;
    return this.http.get<rideFinshed>(api);
  }

  public deleteMappingDriver(passengerEmailId:any){
    console.log("within delete  "+passengerEmailId)
    let api = `${this.baseUrl3}/api/rideDetails/deleteIfPassengerHasGotTheNotification/${passengerEmailId}`;
    return this.http.post(api,{});
  }

  public deletePassengerGotNotification(){
    console.log("within delete got notification")
    let api = `${this.baseUrl3}/api/rideDetails/deletePassengerHasGotNotification/${localStorage.getItem("emailId")}`;
    return this.http.post(api,{});
  }

}
