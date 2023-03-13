import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Email } from '../Model/Email';
import { payment } from '../Model/payment';
import { AfterBookingService } from '../services/after-booking.service';
import { ConnectionService } from '../services/connection.service';
import { OrderService } from '../services/order.service';
import { SendMailService } from '../services/send-mail.service';
import { WalletComponent } from '../wallet/wallet.component';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentform = new FormGroup({
    email: new FormControl(localStorage.getItem('emailId'), [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    name: new FormControl(localStorage.getItem("userName"), [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    amount: new FormControl(localStorage.getItem("amountToPay"), [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(12),
    ]),
  });

  form: payment = new payment();

  payNow() {
    this.form.email = this.paymentform.value.email!;
    this.form.name = this.paymentform.value.name!;
    this.form.phone = this.paymentform.value.phone!;
    this.form.amount = this.paymentform.value.amount!;
    this.Submit();
  }
  paymentId: string | undefined;
  error: string | undefined;
  ImagePath =
    '../../assets/caaeaae00b5c49ddb022b25ff3548cc5__5_-removebg-preview';

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private routerLink: Router,
    private mailSend: SendMailService,
 
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(WalletComponent, {
      width: '45%',
      height: 'auto',
    });
  }

  ngOnInit(): void {
   
  }
  options = {
    key: '',
    amount: '',
    name: 'Poolify',
    description: 'Web Development',
    image: this.ImagePath,
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };
  sendEmail: Email = new Email();
  Submit(): void {
    this.paymentId = '';
    this.error = '';
    console.log(this.form);
    this.orderService.createOrder(this.form).subscribe(
      (data) => {
        this.options.key = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.form.name;
        this.options.prefill.email = this.form.email;
        this.options.prefill.contact = this.form.phone;
        var rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', (response: any) => {
          // Todo - store this information in the server
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        });
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: {
    detail: {
      razorpay_order_id: any;
      razorpay_payment_id: any;
      razorpay_signature: any;
    };
  }): void {
    this.orderService.updateOrder(event.detail).subscribe(
      (data) => {
        console.log('i am inside update order');
        this.paymentId = data.message;
      },
      (err) => {
        this.error = err.error.message;
      }
    )  
    this.mailSend.sendEmailToPassenger().subscribe(x =>console.log(x))
     this.routerLink.navigateByUrl("/success")
    
  }
 

}
