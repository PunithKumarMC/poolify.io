import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AfterBookingService } from '../services/after-booking.service';
import { bookingHistory } from '../Model/bookingHistory';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})

export class RatingComponent {
  constructor(private service : AfterBookingService,private router:Router,private dialog:MatDialog){

  }
  bookingHistory:bookingHistory=new bookingHistory();
  rating:any;
  public ratingValue(){
    this.dialog.closeAll()
    console.log(this.rating +"rating")
    this.bookingHistory.rating.push(this.rating)
    console.log(this.bookingHistory.rating+"check")
    this.service.sendRatingsToBookingHistory(this.bookingHistory).subscribe((data)=>console.log(data));
    this. router. navigateByUrl('/sidenav/main')
    . then(() => {
    window.location.reload();
    });
  }
  
}
