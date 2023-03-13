package com.stackroute.ridefinishednotification.Repository;

import com.stackroute.ridefinishednotification.Domain.Bookings;
import com.stackroute.ridefinishednotification.Domain.RideDetails;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RideDetailsRepository extends MongoRepository<RideDetails,String> {
     Bookings findByDriverId(String email);
}
