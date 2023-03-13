import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { personalDetails } from '../Model/personalDetails';
import { RegisterServiceService } from '../services/register-service.service';
import { address } from '../Model/address';
import { vehicleDetails } from '../Model/vehicleDetails';
import { Router } from '@angular/router';
import { WalletServiceService } from '../services/wallet-service.service';
import { wallet } from '../Model/wallet';
import { profilePhoto } from '../Model/profilePhoto';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  walletdata: wallet = new wallet();
  ngOnInit(): void {
    console.log('within update');
    this.walletdata.emailId = localStorage.getItem('emailId');
    this.walletdata.balance = 200.0;
    console.log(
      this.walletdata.emailId + 'email' + this.walletdata.balance + 'balanca'
    );
    this.walletservice.registerWallet(this.walletdata).subscribe((d) => {
      console.log(d);
    });
  }
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    DOB: ['', Validators.required],
    gender: ['', Validators.required],
    contactNo: ['', Validators.required],
    ownerOrUser: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    streetAdd: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    vehicleName: ['', Validators.required],
    vehicleNumber: ['', Validators.required],
    drivingLicenseNumber: ['', Validators.required],
    vehicleType: ['', Validators.required],

  });
  fourthFormGroup = this._formBuilder.group({
    fourthformgroup: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private service: RegisterServiceService,
    private router: Router,
    private walletservice: WalletServiceService
  ) {}
  personalDetails: personalDetails = new personalDetails();
  Laddress: address = new address();
  LvehicleDetails: vehicleDetails = new vehicleDetails();
  
  //uploading profile photo
  title = 'ImageUploaderFrontEnd';
  public selectedFile: any;
  public event1: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    //to display selected photo
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  //uploading part
  // baseUrl='http://localhost:8080'+'/user-registration-service';
  baseUrl='https://poolify.stackroute.io'+'/user-registration-service';
  
  onUpload() {
    console.log("updating image ");
      const uploadData = new FormData();
       uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
       let api=`${this.baseUrl}/api/v2/upload/${localStorage.getItem('emailId')}`
       this.httpClient.post(api, uploadData).
       subscribe(
         res=>{
           console.log(res);
           this.receivedImageData=res;
           this.base64Data=this.receivedImageData.pic;
           this.convertedImage='data:image/jpeg;base64,'+this.base64Data;},
           err => console.log('Error ocuured during saving'+ err));
     }
  
  save() {
    this.personalDetails.firstName = this.firstFormGroup.value.firstName!;
    this.personalDetails.lastName = this.firstFormGroup.value.lastName!;
    this.personalDetails.dob = this.firstFormGroup.value.DOB!;
    this.personalDetails.gender = this.firstFormGroup.value.gender!;
    this.personalDetails.contactNo = this.firstFormGroup.value.contactNo!;

    this.Laddress.city = this.secondFormGroup.value.city!;
    this.Laddress.streetAdd = this.secondFormGroup.value.streetAdd!;
    this.Laddress.country = this.secondFormGroup.value.country!;
    this.Laddress.state = this.secondFormGroup.value.state!;
    this.Laddress.zipCode = this.secondFormGroup.value.zipCode!;

    this.personalDetails.address = this.Laddress;

    this.personalDetails.userType = this.firstFormGroup.value.ownerOrUser!;
    if (this.personalDetails.userType === 'OWNER') {
      this.LvehicleDetails.vehName = this.thirdFormGroup.value.vehicleName!;
      this.LvehicleDetails.vehNumber = this.thirdFormGroup.value.vehicleNumber!;
      this.LvehicleDetails.dlNumber =
        this.thirdFormGroup.value.drivingLicenseNumber!;
      this.LvehicleDetails.vehType = this.thirdFormGroup.value.vehicleType!;
      this.personalDetails.vehicleDetails = this.LvehicleDetails;
    } else {
      this.personalDetails.vehicleDetails = this.LvehicleDetails;
    }
    console.log(this.personalDetails+" personal details");
    // console.log(uploadData)
    this.service.doUpdate(this.personalDetails).subscribe((result: any) => {
      console.log(result);
      console.log('first NAme ' + result.firstName);
      localStorage.setItem('userName', result.firstName);
      localStorage.setItem('userContact', result.contactNo);
    });
    this.router.navigateByUrl('/sidenav/main').then(() => {
      window.location.reload();
    });
  }
}
