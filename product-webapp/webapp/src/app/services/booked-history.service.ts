import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookingHistory } from '../Model/bookingHistory';

@Injectable({
  providedIn: 'root'
})
export class BookedHistoryService {

  constructor(private http:HttpClient) { }
  // endpoint:string='http://localhost:8085/api/v2/getUserBookedHistory'
  baseurl='https://poolify.stackroute.io'+'/booked-history';
  // baseurl='http://localhost:8080'+'/booked-history';
  
  public getBookedHistory():Observable<bookingHistory>{
    console.log("within booked hisory")
    // let api=`${this.endpoint}/${localStorage.getItem("emailId")}`;
    let api=`${this.baseurl}/api/v2/getUserBookedHistory/${localStorage.getItem("emailId")}`
    return this.http.get<any>(api)
  }
}
