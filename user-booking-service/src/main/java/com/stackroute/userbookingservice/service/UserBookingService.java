package com.stackroute.userbookingservice.service;

import com.stackroute.userbookingservice.domain.UserBooking;
import com.stackroute.userbookingservice.exception.UserDoesNotExistException;

import java.util.List;
import java.util.Optional;

public interface UserBookingService {
    UserBooking addBookingDetails(UserBooking userBooking) throws UserDoesNotExistException;

    boolean deleteBookingDetails(String emailId) throws UserDoesNotExistException;

    UserBooking updateBookingDetails(UserBooking userBooking) throws UserDoesNotExistException;

    List<UserBooking> getAllBookingDetails();

    Optional<UserBooking> getBookingDetailsOfUser(String bookingId) throws UserDoesNotExistException;

    UserBooking updateBookingSeats(int noOfSeats,String emailId) throws UserDoesNotExistException;

    UserBooking updateDatabaseOfUser(String emailId,String serviceType);
}
