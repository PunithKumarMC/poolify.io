import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterBookingService } from '../services/after-booking.service';
import { WalletServiceService } from '../services/wallet-service.service';
import { WalletComponent } from '../wallet/wallet.component';

@Component({
  selector: 'app-payment-medium',
  templateUrl: './payment-medium.component.html',
  styleUrls: ['./payment-medium.component.css']
})
export class PaymentMediumComponent implements OnInit {

  constructor(private wallet: WalletServiceService, public dialog: MatDialog,private route:Router,   private service:AfterBookingService) {}
  
  clickTOPay:any
  ngOnInit(): void {
    this.service.getCostOfRide().subscribe(d=>{
      console.log("amount to be paid"+d.price);
      localStorage.setItem("amountToPay",d.price!);
    })
    

    this.clickTOPay="enabled";
    localStorage.setItem("clickToPay",this.clickTOPay);

    throw new Error('Method not implemented.');
  }
  //to show wallet and its balance
  tranactions: any = [];
  Wbalance: any;
openWallet() {    const dialogRef = this.dialog.open(WalletComponent, {
  width: '55%',
  height: 'auto',
});



this.wallet.getTransactionHistory().subscribe((data) => {
  console.log(data.transactionHistory);
  let x = data.transactionHistory.reverse();
  this.Wbalance = x[0];
  let y = x.slice(0, 6);
  console.log(y);
  for (let index = 0; index < y.length - 1; index++) {
    this.tranactions.push(y[index] - y[index + 1]);
  }
  console.log(this.tranactions);
});
};
openPayment(){
  this.dialog.closeAll();
  this.route.navigateByUrl("/sidenav/payment")
};
public OpenAfterBooking(){
  this.dialog.closeAll();
  this.route.navigateByUrl("/success");
}

}
