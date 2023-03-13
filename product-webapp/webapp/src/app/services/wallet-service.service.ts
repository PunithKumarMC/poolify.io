import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { wallet } from '../Model/wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletServiceService {
  constructor(private http: HttpClient) {}
  baseUrl='https://poolify.stackroute.io'+'/payment-wallet';
  // baseUrl='http://localhost:8080'+'/payment-wallet';
  //endpoint:string="http://localhost:7632/wallet/v1"
  public getTransactionHistory(): Observable<any> {
    let api=`${this.baseUrl}/wallet/v1/getTransactionHistory/${localStorage.getItem("emailId")}`
    return this.http.get(api);
  }
  public addMoney(){
    

    console.log("inside addmoney")
  }

  public registerWallet(walletdata:wallet):Observable<any>{
    const contentType = {'content-Type':'application/json'}
    console.log("register wallet"+walletdata.emailId)
    let api=`${this.baseUrl}/wallet/v1/register`;
    const jsonfile= JSON.stringify(walletdata)
    return this.http.post(api,jsonfile,{'headers':contentType});
  }

  public addMoneyToWallet(money:any){
    const contentType = {'content-Type':'application/json'}
    console.log("within add to wallet");
    // let api=`${"http://localhost:7632/wallet/v1/update/add"}`
    let api=`${this.baseUrl}/wallet/v1/update/add`;
    const jsonfile= JSON.stringify(money)
    return this.http.post(`${api}/${localStorage.getItem("emailId")}`,jsonfile,{'headers':contentType});
  }
  

  public SendMoneyToDriver(money:any){
    const contentType = {'content-Type':'application/json'}
    console.log("within add to wallet");
    // let api=`${"http://localhost:7632/wallet/v1/update/add"}`
    let api=`${this.baseUrl}/wallet/v1/update/add`;
    const jsonfile= JSON.stringify(money)
    console.log(localStorage.getItem("bookedDriverEmailId")+"money "+money);
    return this.http.post(`${api}/${localStorage.getItem("bookedDriverEmailId")}`,jsonfile,{'headers':contentType});
  }


  public deductMoneyFromWallet(){
    const contentType = {'content-Type':'application/json'}
    console.log("within deduct to wallet");
    // let api=`${"http://localhost:7632/wallet/v1/update/deduct"}`
    let api=`${this.baseUrl}/wallet/v1/update/deduct`;
    const jsonfile= JSON.stringify(localStorage.getItem("amountToPay"));
    console.log("within deduct to wallet" +localStorage.getItem("amountToPay") );
    console.log("within deduct to wallet" +localStorage.getItem("emailId"));
    return this.http.post<any>(`${api}/${localStorage.getItem("emailId")}`,jsonfile,{'headers':contentType});
  }
}
