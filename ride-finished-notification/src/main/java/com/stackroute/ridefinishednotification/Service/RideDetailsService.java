package com.stackroute.ridefinishednotification.Service;

import com.stackroute.ridefinishednotification.Domain.Bookings;
import com.stackroute.ridefinishednotification.Domain.RideDetails;
import com.stackroute.ridefinishednotification.Domain.RideFinished;
import com.stackroute.ridefinishednotification.Exception.DriverAlreadyExistsException;
import com.stackroute.ridefinishednotification.Exception.DriverDoesNotExistsException;
import com.stackroute.ridefinishednotification.Exception.RideAlreadyExistsException;
import com.stackroute.ridefinishednotification.Exception.RideNotBookedException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface RideDetailsService {
	public  RideDetails bookingDetailsMapping(RideDetails rideDetails) throws DriverAlreadyExistsException;
	public  RideDetails updatePassengerForDriver(String Driveremail, Bookings bookings) throws RideAlreadyExistsException, DriverDoesNotExistsException;
	public Optional<RideDetails> getAllMappedRidesWithDriver(String DriverEmail);
	public RideFinished endRideForPassenger(String driverEmail,String passengerEmail);
	public RideFinished getRideFinishedTable(String passengerEmail);

	public RideFinished deleteIfPassengerHasGotTheNotification(String passengerEmail);

	RideDetails deletePassengerGotNotification(String driverEmail);
}
