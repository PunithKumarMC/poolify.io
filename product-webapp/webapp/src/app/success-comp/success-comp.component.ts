import { Component, OnInit } from '@angular/core';
import { yearsPerPage } from '@angular/material/datepicker';

import { Router } from '@angular/router';

@Component({
  selector: 'app-success-comp',
  templateUrl: './success-comp.component.html',
  styleUrls: ['./success-comp.component.css'],
})
export class SuccessCompComponent implements OnInit {
  constructor(private router:Router){} 

check="no"
  ngOnInit(): void {
    this.check="yes";
    setTimeout(() => {
      if(localStorage.getItem("userType")=="OWNER" && localStorage.getItem("drivertoggleClient")=="true"){ 
      this.router.navigateByUrl("/sidenav/after-booking-owner")
      .then(()=>{
        window.location.reload();
      })
      }else{
        console.log()
        this.router.navigateByUrl("/sidenav/after-booking")
      .then(()=>{
        window.location.reload();
      })
      }}, 4000);
  
    throw new Error('Method not implemented.');
  }
  

}
