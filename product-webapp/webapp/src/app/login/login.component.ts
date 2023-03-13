import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { login } from '../Model/login';
import { RegisterServiceService } from '../services/register-service.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  ngOnInit(): void {
   
  }

  constructor(private service: RegisterServiceService,private router: Router,private conservice:ConnectionService,private guard:AuthGuard ) {}
  login: login = new login();
  error: string = '';
  token: any;
  public onLogin() {
    // this.router.navigateByUrl('/sidenav/main', { skipLocationChange: true });
// this.router.navigate(["main"]);
    this.login.emailId = this.registerform.value.email!;
    this.login.password = this.registerform.value.password!;
    this.service.doLogin(this.login).subscribe(
      (result: any) => {
        this.service.generateToken(result.token, this.login.emailId),
          console.log(result.message);
          console.log("login guard")
          sessionStorage.setItem('userLoggedIn', 'true')
          this.goMain();
      }, //from backend we have sent two varoable named as token and message which is getting printed, if you don't provide the correct variable name it will give you undefined error
      (Error) => (this.error = 'Invalid Credentials')
    );
  }

  goMain(){
    this. router. navigateByUrl('/sidenav/main')
    . then(() => {
    window.location.reload();
    })
    }



}
