export class passengerDetails{
    constructor(
        public emailId:String|undefined,
        public noOfSeatsRequired:number,
        public serviceType:String,
        public bookedDate:String|undefined,
        public bookedTime:String|undefined,
        public reqInsurance:boolean|undefined,
        public vehicleType:string,
        public fromPlace:string,
        public toPlace:string,
        public price:string|undefined,
        public rideEnded:Boolean|undefined
    ){}
}
