import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { RideNotificationService } from '../services/ride-notification.service';

@Component({
  selector: 'app-ride-finished-dialog',
  templateUrl: './ride-finished-dialog.component.html',
  styleUrls: ['./ride-finished-dialog.component.css']
})
export class RideFinishedDialogComponent implements OnInit {
  constructor(private service:RideNotificationService,private dialog:Dialog){}

  email:any;
  userName:any;
  ngOnInit(): void {
    this.userName=localStorage.getItem("userName");
    this.email=localStorage.getItem("rideFinishedDriverEmail");

    throw new Error('Method not implemented.');
  }

  openRating(){
    console.log("within open rating")
    this.service.deleteMappingDriver(localStorage.getItem("emailId")).subscribe();
    let dialogRef = this.dialog.open(RatingComponent, {
      width: '45%',
      height: 'auto%',
    });
  }
}
