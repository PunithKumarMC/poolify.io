package com.stackroute.userbookingservice.controller;

import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
import com.stackroute.userbookingservice.service.GeoLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
//@CrossOrigin
@RestController
public class GeocodeController {
    private GeoLocationService geoLocationService;

    @Autowired
    public GeocodeController(GeoLocationService geoLocationService) {
        this.geoLocationService = geoLocationService;
    }

    @GetMapping("/getLocation")
    public ResponseEntity<?> getGeoDetails(@RequestParam String address) throws NoSuchFieldException, IOException {
        return new ResponseEntity<>(geoLocationService.getLocationAndSaveDetails(address), HttpStatus.OK);
    }


    @GetMapping("/getDistance")
    public ResponseEntity<?> getDistance(@RequestParam String fromplace, @RequestParam String toplace, @RequestParam String emailId) throws UnsupportedEncodingException, UserDoesNotExistException {
        return new ResponseEntity<>(geoLocationService.getDistanceAndSaveDetails(fromplace, toplace, emailId), HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<?> testing(@RequestParam String fromPlace, @RequestParam String toPlace, @RequestParam String emailId) {
        return new ResponseEntity<>(geoLocationService.matchingRoutes(fromPlace,toPlace,emailId), HttpStatus.OK);
    }

    @GetMapping("/getDriversForPassengers")
    public ResponseEntity<?> getAllDriversForPassengers(@RequestParam String fromPlace, @RequestParam String toPlace, @RequestParam String emailId) throws UserDoesNotExistException {
        return new ResponseEntity<>(geoLocationService.fetchDriverDetailsForMatchingPassenger(fromPlace,toPlace,emailId),HttpStatus.OK);
    }

    @GetMapping("/getPassengersForDrivers")
    public ResponseEntity<?> getAllPassengersForDrivers(@RequestParam String fromPlace, @RequestParam String toPlace, @RequestParam String emailId) throws UserDoesNotExistException {
        return new ResponseEntity<>(geoLocationService.fetchPassengerDetailsForMatchingDriver(fromPlace,toPlace,emailId),HttpStatus.OK);
    }
}
