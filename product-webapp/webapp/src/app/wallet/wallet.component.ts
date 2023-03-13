import { Dialog } from '@angular/cdk/dialog';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from '../Model/Email';
import { payment } from '../Model/payment';
import { OrderService } from '../services/order.service';
import { SendMailService } from '../services/send-mail.service';
import { WalletServiceService } from '../services/wallet-service.service';
declare var Razorpay: any;
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  constructor(private wallet: WalletServiceService,private orderService: OrderService,
    private routerLink: Router,
    private mailSend: SendMailService,private dialog:Dialog) {}
  tranactions:any=[] ;
  balance:any;
 
  money:any;
  clickToPay:any
  ngOnInit(): void {
    this.wallet.getTransactionHistory().subscribe((data) => {
      console.log(data.transactionHistory);
      let x=data.transactionHistory.reverse();
      this.balance = x[0];
      let y=x.slice(0,6);
      console.log(y);
      for (let index = 0; index < y.length-1; index++) {
        this.tranactions.push(y[index]-y[index+1]);
        }
      console.log(this.tranactions);
     
    });

  this.clickToPay=localStorage.getItem("clickToPay")
  }
  // for creating order
  form: payment = new payment();
  payNow() {
    this.form.email = localStorage.getItem("emailId")!;
    this.form.name = localStorage.getItem("userName")!;
    this.form.phone = localStorage.getItem("userContact")!;
    this.form.amount = this.money!;
    this.Submit();
  }

  paymentId: string | undefined;
  error: string | undefined;
  ImagePath =
    '../../assets/caaeaae00b5c49ddb022b25ff3548cc5__5_-removebg-preview';
  
    // Options are sent Razor Pay
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
        color: '#3399CC',
      },
    };


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
    // this.routerLink.navigateByUrl("/main");
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
  this.addMoney();
     this.routerLink.navigateByUrl("/main")
    
  }

  public addMoney(){
    this.wallet.addMoneyToWallet(this.money).subscribe(d=>{console.log(d+"wallet money")})
    this. routerLink. navigateByUrl('/sidenav/main')
    . then(() => {
    window.location.reload();
    })
    console.log("wallet money ")
  }
  toggleValue:boolean=false;
  public getToggleValue(toggle:boolean){
    this.toggleValue=toggle;
  }

WalletError:string='';

public deductMoney(){
  //
  this.wallet.deductMoneyFromWallet().subscribe(d=>{
    console.log(d+"deduct Money");
    // this.wallet.SendMoneyToDriver(this.money).subscribe(e=>console.log(e +"added money to driver wallet"))
    this.routerLink.navigateByUrl("/success")
    . then(() => {
    window.location.reload();
    });
  },(Error)=>{this.WalletError="Add Balance to Pay"});

}
}
