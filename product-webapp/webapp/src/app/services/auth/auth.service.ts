import { Injectable } from '@angular/core';
import { RegisterServiceService } from '../register-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean = true;
  token!: string;
  authStatusListener: any;
  router: any;
  route: any;
  constructor(private service : RegisterServiceService) { }
  
isAuthenticated(){
  //  this.isLoggedIn=this.service.isLoggedIn()
  //  console.log(this.isLoggedIn+" check")

  // let token=localStorage.getItem("loggedin");
  // console.log(token+" token")
  //     if(token==undefined || token==='' || token==null){
  //       this.isLoggedIn = false ;
  //     }else{
  //       this.isLoggedIn = true;
  //     }

  // return this.isLoggedIn;
  }
  

  
}