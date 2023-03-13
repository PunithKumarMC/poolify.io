import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../Model/login';
import { Register } from '../Model/Register';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { personalDetails } from '../Model/personalDetails';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl='https://poolify.stackroute.io'+'/user-registration-service';
  // baseUrl='http://localhost:8080'+'/user-registration-service';
  
  // private registerUrl = 'http://localhost:1112/api/v2/register';
  public doRegistration(user: Register) {
    //through http we have passed the api and has given api data to hit ie, user in our case
    let api=`${this.baseUrl}/api/v2/register`
    return this.http.post<Register>(
      api,
      user
    );
  }
  public doLogin(Loginuser: login) {
    let baseUrlLogin='https://poolify.stackroute.io'+'/user-authentication-service';
    // let baseUrlLogin='http://localhost:8080'+'/user-authentication-service';
    let api=`${baseUrlLogin}/api/v1/login`
    return this.http.post<login>(
      api,
      Loginuser
    );
  }
  public doUpdate(updateUser: personalDetails) {
    console.log(localStorage.getItem('emailId')+"do update");
    console.log(updateUser +  "update user check")
    let endpoint="http://localhost:1112/api/v2/register"
    // let api=`${endpoint}/${localStorage.getItem('emailId')}`
    let api=`${this.baseUrl}/api/v2/register/${localStorage.getItem('emailId')}`;
    return this.http.post<personalDetails>(
      api,
      updateUser
    );
    
}

  register() {
    this.router.navigateByUrl('login');
  }
  generateToken(token: any, loginEmail: any) {
    localStorage.setItem('logintoken', token);
    localStorage.setItem('emailId', loginEmail);
    this.router.navigateByUrl('main');
    console.log('test');
    console.log(localStorage.getItem('emailId'));
    console.log(localStorage.getItem('logintoken'));
  }
    // to check user is loggedin or not
    isLoggedIn(){
      let token=localStorage.getItem("token");
      if(token==undefined || token==='' || token==null){
        return false;
      }else{
        return true;
      }
    }
    // to log out user
    logout()
    {
      localStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('emailId');
      this.router.navigateByUrl("/home");
      sessionStorage.setItem('userLoggedIn', 'false');
      return  true;
    }
}
