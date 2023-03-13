import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../Model/Email';
@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  constructor(private http: HttpClient) {}
  sendEmail: Email = new Email();
  baseUrl='https://poolify.stackroute.io'+'/email-service';
  // baseUrl='http://localhost:8080'+'/email-service';
  sendEmailToPassenger() {
    this.sendEmail.receiver = localStorage.getItem("bookedPassengerEmailId");
    this.sendEmail.messageBody = 'You ride has been booked, Enjoy your ride!.... In case of any queries, Please feel free to reach out to us';
    this.sendEmail.subject = 'Booking confirmed ';
    console.log(this.sendEmail);
    let api=`${this.baseUrl}/api/mail/sendMail`

    return this.http.post<any>(
      api,
      this.sendEmail
    );
  }

  sendEmailToPassengerForRideFinished(email:any) {
    console.log("within email")
    this.sendEmail.receiver =email; 
    this.sendEmail.messageBody = 'Your ride has been ended, Thank You for using Poolify!.....';
    this.sendEmail.subject = 'Confirmation of Ride Ended';
    console.log(this.sendEmail);
    let api=`${this.baseUrl}/api/mail/sendMail`;
    return this.http.post<any>(
      api,
      this.sendEmail
    );
  }
}
