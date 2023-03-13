package com.stackroute.userbookingservice.controller;

import com.stackroute.userbookingservice.domain.UserBooking;
import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
import com.stackroute.userbookingservice.service.UserBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//@CrossOrigin
@RestController
public class UserBookingController {
    private UserBookingService userBookingService;

    @Autowired
    public UserBookingController(UserBookingService userBookingService) {
        this.userBookingService = userBookingService;
    }

    @PostMapping("/saveUser")
    public ResponseEntity<?> saveUserBookingDetails(@RequestBody UserBooking userBooking) throws UserDoesNotExistException {
        return new ResponseEntity<>(userBookingService.addBookingDetails(userBooking), HttpStatus.CREATED);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllRegisteredUsers() {
        return new ResponseEntity<>(userBookingService.getAllBookingDetails(), HttpStatus.OK);
    }

        @PutMapping("/updateUsers")
    public ResponseEntity<?> updateRegisteredUserData(@RequestBody UserBooking userBooking) {
        try {
            return new ResponseEntity<>(userBookingService.updateBookingDetails(userBooking), HttpStatus.CREATED);
        } catch (UserDoesNotExistException e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/getDataOfUser/{emailId}")
    public ResponseEntity<?> getDetailsOfGivenUser(@PathVariable String emailId) {
        try {
            return new ResponseEntity<>(userBookingService.getBookingDetailsOfUser(emailId), HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/deleteUser/{emailId}")
    public ResponseEntity<?> deleteUser(@PathVariable String emailId) {
        try {
            return new ResponseEntity<>(userBookingService.deleteBookingDetails(emailId), HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/updateSeats/{noOfSeatsRequired}/{emailId}")
    public ResponseEntity<?> updateSets(@PathVariable int noOfSeatsRequired,@PathVariable String emailId){
        try {
            return new ResponseEntity<>(userBookingService.updateBookingSeats(noOfSeatsRequired, emailId),HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/updateDatabase/{emailId}/{serviceType}")
    public ResponseEntity<?> updateDatabaseOfUser(@PathVariable String emailId,@PathVariable String serviceType) {
        return new ResponseEntity<>(userBookingService.updateDatabaseOfUser(emailId,serviceType),HttpStatus.CREATED);

    }


}
