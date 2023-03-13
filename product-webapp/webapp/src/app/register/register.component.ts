import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Register } from '../Model/Register';
import { RegisterServiceService } from '../services/register-service.service';
import { WalletServiceService } from '../services/wallet-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  constructor(private service: RegisterServiceService,private wallet:WalletServiceService) {}
  user: Register = new Register();
  ngOnInit(): void {

  }

  //initialize register user obj
  // user : Register=new Register(this.registerform.controls.email.value,this.registerform.controls.password.value);
  msg: any;
  public registerNow() {
    this.user.email = this.registerform.value.email!;
    this.user.password = this.registerform.value.password!;
    this.service.doRegistration(this.user).subscribe((data: any) => {
      this.service.register();
      console.log(data);
    },(Error:any) => (this.msg="User Already Exists"));
  }

  showDetails() {
    console.log(this.registerform.controls.email.value);
  }
}
