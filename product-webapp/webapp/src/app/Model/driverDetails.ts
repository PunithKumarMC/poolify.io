export class driverDetails{
    constructor(
        public emailId:string|undefined,
        public noOfSeatsRequired:number|undefined,
        public serviceType:string|undefined,
        public bookedDate:string|undefined,
        public bookedTime:string|undefined,
        public fromPlace:string|undefined,
        public toPlace:string|undefined,
        public rideEnded:Boolean|undefined
    ){}
}