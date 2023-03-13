package com.stackroute.ridefinishednotification.Service;

import com.stackroute.ridefinishednotification.Domain.Bookings;
import com.stackroute.ridefinishednotification.Domain.PassengerBookings;
import com.stackroute.ridefinishednotification.Domain.RideDetails;
import com.stackroute.ridefinishednotification.Domain.RideFinished;
import com.stackroute.ridefinishednotification.Exception.DriverAlreadyExistsException;
import com.stackroute.ridefinishednotification.Exception.DriverDoesNotExistsException;
import com.stackroute.ridefinishednotification.Exception.RideAlreadyExistsException;
import com.stackroute.ridefinishednotification.Exception.RideNotBookedException;
import com.stackroute.ridefinishednotification.Repository.RideDetailsRepository;
import com.stackroute.ridefinishednotification.Repository.RideFinishedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class RideDetailsServiceImpl implements RideDetailsService {
	@Autowired
	RideDetailsRepository rideDetailsRepository;
	@Autowired
	RideFinishedRepository rideFinishedRepository;
@Autowired
	public RideDetailsServiceImpl(RideDetailsRepository rideDetailsRepository, RideFinishedRepository rideFinishedRepository) {
		this.rideDetailsRepository = rideDetailsRepository;
		this.rideFinishedRepository = rideFinishedRepository;
	}

	@Override
	public RideDetails bookingDetailsMapping(RideDetails rideDetails) throws DriverAlreadyExistsException {
        RideDetails save=new RideDetails();
		try{
			if(rideDetailsRepository.findById(rideDetails.getDriverId()).isPresent()){
				throw new DriverAlreadyExistsException();
			}
			else save=rideDetailsRepository.save(rideDetails);
		}
		catch (DriverAlreadyExistsException driverAlreadyExistsException){
			throw new DriverAlreadyExistsException();
		}
		return save;
	}

	@Override
	public RideDetails updatePassengerForDriver(String Driveremail, Bookings bookings) throws RideAlreadyExistsException, DriverDoesNotExistsException {
		RideDetails rideDetails=new RideDetails();
		try{
			if(rideDetailsRepository.findById(Driveremail).isEmpty()){
				throw new DriverDoesNotExistsException();
			}
			rideDetails=rideDetailsRepository.findById(Driveremail).get();
			if (rideDetails.getBooking()==null){
				System.out.println("registering");
				rideDetails.setBooking(Arrays.asList(bookings));
				//filling table to send notifications
				if(rideFinishedRepository.findById(bookings.getPassengerId()).isPresent()){
					System.out.println("filling ride finished repo 59");
					RideFinished rideFinished=rideFinishedRepository.findById(bookings.getPassengerId()).get();
					rideFinished.getPassengerBookings().add(new PassengerBookings(Driveremail,"no"));
					rideFinishedRepository.save(rideFinished);
					//System.out.println(rideFinishedRepository.save(rideFinished));
				}
				else {
					System.out.println("filling ride finished repo else 66");

					RideFinished rideFinished=new RideFinished();
					rideFinished.setPassengerId(bookings.getPassengerId());
					PassengerBookings passengerBookings=new PassengerBookings(Driveremail,"no");
					rideFinished.setPassengerBookings(Arrays.asList(passengerBookings));
					rideFinishedRepository.save(rideFinished);
					//System.out.println(rideFinishedRepository.save(rideFinished).getPassengerBookings());
				}
			}
			else{
				System.out.println(rideDetails.getBooking().get(0).getPassengerId());
				System.out.println(bookings.getPassengerId());
				if (rideDetails.getBooking().get(rideDetails.getBooking().size()-1).getPassengerId().equals(bookings.getPassengerId())){
					System.out.println(rideDetails.getBooking().get(0));
					System.out.println(bookings.getPassengerId());
					throw new RideAlreadyExistsException();
				}

				else {

					rideDetails.getBooking().add(bookings);
					//filling table to send notifications
					if(rideFinishedRepository.findById(bookings.getPassengerId()).isPresent()){
						System.out.println("filling ride finished repo 59");
						RideFinished rideFinished=rideFinishedRepository.findById(bookings.getPassengerId()).get();
						rideFinished.getPassengerBookings().add(new PassengerBookings(Driveremail,"no"));
						rideFinishedRepository.save(rideFinished);
						//System.out.println(rideFinishedRepository.save(rideFinished));
					}
					else {
						System.out.println("filling ride finished repo else 66");

						RideFinished rideFinished=new RideFinished();
						rideFinished.setPassengerId(bookings.getPassengerId());
						PassengerBookings passengerBookings=new PassengerBookings(Driveremail,"no");
						rideFinished.setPassengerBookings(Arrays.asList(passengerBookings));
						rideFinishedRepository.save(rideFinished);
						//System.out.println(rideFinishedRepository.save(rideFinished).getPassengerBookings());
					}
				}
			}
		}
		catch (DriverDoesNotExistsException e) {
			throw new DriverDoesNotExistsException();
		}
		catch (RideAlreadyExistsException rideAlreadyExistsException){
			throw new RideAlreadyExistsException();
		}
		System.out.println("saving");
		return rideDetailsRepository.save(rideDetails);
	}

	public Optional<RideDetails> getAllMappedRidesWithDriver(String DriverEmail){
		  Optional<RideDetails> rideDetails=rideDetailsRepository.findById(DriverEmail);
		System.out.println(rideDetails);
		  return rideDetails;
	}

	@Override
	public RideFinished endRideForPassenger(String driverEmail, String passengerEmail) {
	RideFinished rideFinished=rideFinishedRepository.findById(passengerEmail).get();
	RideDetails rideDetails=rideDetailsRepository.findById(driverEmail).get();
		System.out.println(rideFinished+"---before for ride finished");
		System.out.println(rideFinished.getPassengerBookings().size()+ "----size of array list");
		for (int i = 0; i <= rideFinished.getPassengerBookings().size()-1; i++) {
			System.out.println(rideFinished.getPassengerBookings().get(i).getDriverEmail()+"----getting driver email");
			System.out.println(driverEmail+ "----driver email from front end");
			if (rideFinished.getPassengerBookings().get(i).getDriverEmail().equalsIgnoreCase(driverEmail)){
				System.out.println("inside for loop");
				rideFinished.getPassengerBookings().get(i).setRideFinish("yes");
				rideFinishedRepository.save(rideFinished);
				System.out.println(rideFinished.getPassengerBookings().get(i).getRideFinish()+"----ride is finished");
			}
		}
		for (int i = 0; i<=rideDetails.getBooking().size()-1;i++){
			System.out.println("inside for of ride details");
			if(rideDetails.getBooking().get(i).getPassengerId().equalsIgnoreCase(passengerEmail) ){
				rideDetails.getBooking().get(i).setRideFinished("yes");
				rideDetailsRepository.save(rideDetails);
				System.out.println(rideDetails.getBooking().get(i).getRideFinished()+"----ride is finished");
			}
		}




		System.out.println(rideFinished+"---after for ride finished");
	return rideFinished;
	}

	@Override
	public RideFinished getRideFinishedTable(String passengerEmail) {
	RideFinished rideFinished=rideFinishedRepository.findById(passengerEmail).get();
		System.out.println(rideFinished);
		return rideFinished;
	}

	//add mapping to delete when ride is finished

	@Override
	public RideFinished deleteIfPassengerHasGotTheNotification(String passengerEmail) {
		RideFinished rideFinished=rideFinishedRepository.findById(passengerEmail).get();
// rideFinished.getPassengerBookings().remove(0);
		for (int i = 0; i <=rideFinished.getPassengerBookings().size()-1 ; i++) {
			if(rideFinished.getPassengerBookings().get(i).getRideFinish().equals("yes")){
				rideFinished.getPassengerBookings().remove(i);
				rideFinishedRepository.save(rideFinished);
			}
		}
		return rideFinished;
	}

	@Override
	public RideDetails deletePassengerGotNotification(String driverEmail) {
		RideDetails rideDetails = rideDetailsRepository.findById(driverEmail).get();
		for (int i = 0; i <=rideDetails.getBooking().size()-1 ; i++) {
			if(rideDetails.getBooking().get(i).getRideFinished().equalsIgnoreCase("yes") ){
				rideDetails.getBooking().remove(i);
				rideDetailsRepository.save(rideDetails);
				System.out.println("deleted the passenger");
			}
		}
		return rideDetails;
	}

}
