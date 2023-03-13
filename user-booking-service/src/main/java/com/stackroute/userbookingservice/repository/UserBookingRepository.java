package com.stackroute.userbookingservice.repository;

import com.stackroute.userbookingservice.domain.UserBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserBookingRepository extends MongoRepository<UserBooking,Integer> {
    boolean findByBookingId(String bookingId);
    void deleteByEmailId(String emailID);
    Optional<UserBooking> findByEmailId(String emailId);
}
