package com.stackroute.ridefinishednotification.Controller;

import com.stackroute.ridefinishednotification.Domain.Bookings;
import com.stackroute.ridefinishednotification.Domain.RideDetails;
import com.stackroute.ridefinishednotification.Exception.DriverAlreadyExistsException;
import com.stackroute.ridefinishednotification.Exception.DriverDoesNotExistsException;
import com.stackroute.ridefinishednotification.Exception.RideAlreadyExistsException;
import com.stackroute.ridefinishednotification.Repository.RideFinishedRepository;
import com.stackroute.ridefinishednotification.Service.RideDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rideDetails")
//@CrossOrigin
public class RideDetailsController {
	private ResponseEntity responseEntity;
	private RideDetailsService rideDetailsService;
	private final RideFinishedRepository rideFinishedRepository;


	@Autowired
	public RideDetailsController(RideDetailsService rideDetailsService,
	                             RideFinishedRepository rideFinishedRepository) {
		this.rideDetailsService = rideDetailsService;
		this.rideFinishedRepository = rideFinishedRepository;
	}

	@PostMapping("/registerDriver")

	public ResponseEntity<?> register(@RequestBody RideDetails rideDetails){
    try {
		return new ResponseEntity<>(rideDetailsService.bookingDetailsMapping(rideDetails), HttpStatus.OK);
    }
	catch (DriverAlreadyExistsException e) {
	    throw new RuntimeException(e);
    }

	}

	@PostMapping("/updateBookings/{email}")

	public ResponseEntity<?> updateBookings(@PathVariable String email, @RequestBody Bookings bookings){
		try {
			return new ResponseEntity<>(rideDetailsService.updatePassengerForDriver(email,bookings),HttpStatus.OK);
		} catch (RideAlreadyExistsException e) {
			throw new RuntimeException(e);
		} catch (DriverDoesNotExistsException e) {
			throw new RuntimeException(e);
		}

	}
	@PostMapping("/endRide/{driverEmail}/{passengerEmail}")
	public ResponseEntity<?> endRideForPassenger(@PathVariable String driverEmail,@PathVariable String passengerEmail)  {
		rideDetailsService.endRideForPassenger(driverEmail,passengerEmail);
		return new ResponseEntity<>("Ride is finished",HttpStatus.OK);
	}

	@GetMapping("/getAllPassengers/{email}")
	public ResponseEntity<?> getAllMappedRidesWithDriver(@PathVariable String email){
     return new ResponseEntity<>(rideDetailsService.getAllMappedRidesWithDriver(email),HttpStatus.OK);
	}

	@GetMapping("getAllDriverForPassenger/{passengerEmail}")
	public ResponseEntity<?> getAllDriverForPassenger(@PathVariable String passengerEmail){
		return new ResponseEntity<>(rideDetailsService.getRideFinishedTable(passengerEmail),HttpStatus.OK);
	}

	@PostMapping("deleteIfPassengerHasGotTheNotification/{passengerEmail}")
	public ResponseEntity<?> deleteIfPassengerHasGotTheNotification(@PathVariable String passengerEmail){
		rideDetailsService.deleteIfPassengerHasGotTheNotification(passengerEmail);
		return new ResponseEntity<>("deleted",HttpStatus.OK);
	}

	@PostMapping("deletePassengerHasGotNotification/{driverEmail}")
	public ResponseEntity<?> deletePassengerHasGotNotification(@PathVariable String driverEmail){
		return new ResponseEntity<>(rideDetailsService.deletePassengerGotNotification(driverEmail),HttpStatus.OK);
	}

}
