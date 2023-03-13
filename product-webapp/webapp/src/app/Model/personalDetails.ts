import { address } from './address';
import { profilePhoto } from './profilePhoto';
import { vehicleDetails } from './vehicleDetails';

export class personalDetails {
  public firstName: any;
  public lastName: any;
  public dob: any;
  public gender: any;
  public contactNo: any;
  public address = new address();
  public userType: any;
  public vehicleDetails = new vehicleDetails();
  constructor() {}
}
