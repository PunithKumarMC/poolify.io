import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  declare var Razorpay: any;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl='https://poolify.stackroute.io'+'/payment-gateway';
  // baseUrl='http://localhost:8080'+'/payment-gateway'              
  addToWallet:any;

  constructor(private http: HttpClient) { }
  createOrder(order: { name: any; email: any; phone: any; amount: any; }): Observable<any> {
    let api=`${this.baseUrl}/api/order`
    // 'http://localhost:8857/api/order;
    return this.http.post<any>(api, {
    customerName: order.name,
    email: order.email,
    phoneNumber: order.phone,
    amount: order.amount
    }, httpOptions);
    
}


updateOrder(order: { razorpay_order_id: any; razorpay_payment_id: any; razorpay_signature: any; }): Observable<any> {
  console.log("amount within update order "+localStorage.getItem("amountToPay"))
   let api=`${this.baseUrl}/api/order`
  //  'http://localhost:8857/api/order'
    return this.http.put<any>(api, {
    razorpayOrderId: order.razorpay_order_id,
    razorpayPaymentId: order.razorpay_payment_id,
    razorpaySignature: order.razorpay_signature
    }, httpOptions);
}



}
