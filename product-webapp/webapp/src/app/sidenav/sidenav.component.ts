import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';
import { RegisterServiceService } from '../services/register-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private register:RegisterServiceService,private router:Router,private service:ConnectionService) { }
  userName:any
  typeOfUser:any
  image:any;
  type:string='';

  ngOnInit(): void {
    
  this.userName=localStorage.getItem("userName");
  // this.checkUserType();
  this.image=localStorage.getItem("profilePhoto");
  // this.typeOfUser=localStorage.getItem("userType");
  this.type=localStorage.getItem('drivertoggleClient')!;
  setTimeout(() => {
  this.checkUserType()
  }, 2000);
 
  console.log(" type os iuser sidenav"+this.typeOfUser)
  }
  public signout(){
    this.register.logout();
  }
  goMain(){
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/sidenav/main']);
  // }); 
  this. router. navigate(['/sidenav/main'])
  . then(() => {
  window.location.reload();
  })
  }
  goMusic(){
    this.router.navigate(['/sidenav/music'])
    .then(()=>{
      window.location.reload();
    })
  }

  goAfter(){
    this.router.navigate(['/sidenav/after-booking-owner'])
    .then(()=>{
      window.location.reload();
    })
  }


  logout(){
    console.log("logout");
    this.register.logout();
  }
  

  reload(){
    this.userName=localStorage.getItem("userName");
    // this.checkUserType();
    this.image=localStorage.getItem("profilePhoto");
    // this.typeOfUser=localStorage.getItem("userType");
  }

  public checkUserType() {
    this.service
      .getUsersByEmail(localStorage.getItem('emailId')!)
      .subscribe((d) => {
        console.log(
          'email get user by email' + localStorage.getItem('emailId')
        );
        this.typeOfUser = d.updateDetails.userType;
        
        console.log(this.typeOfUser + ' type of user');
      });
  }

}
