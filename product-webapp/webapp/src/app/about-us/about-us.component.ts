import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(private router:Router){}

  goMain(){
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['/sidenav/main']);
    // }); 
    this. router. navigate(['/sidenav/main'])
    . then(() => {
    window.location.reload();
    })
    }
}
