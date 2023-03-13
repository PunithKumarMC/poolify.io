package com.stackroute.userbookingservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stackroute.userbookingservice.domain.AllPlaces;
import com.stackroute.userbookingservice.domain.DistResponse;
import com.stackroute.userbookingservice.domain.Location;
import com.stackroute.userbookingservice.domain.Response;
import com.stackroute.userbookingservice.exception.UserDoesNotExistException;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface GeoLocationService {

    boolean matchingRoutes(String fromPlace,String toPlace, String emailId) ;

    DistResponse getDistanceAndSaveDetails(String fromPlace,String toPlace, String emailId) throws UnsupportedEncodingException, UserDoesNotExistException;

    Location getLocationAndSaveDetails(String address);
    List<String> fetchDriverDetailsForMatchingPassenger(String fromPassengerPlace, String toPassengerPlace,String emailId) throws UserDoesNotExistException;
    List<String> fetchPassengerDetailsForMatchingDriver(String fromDriverPlace, String toDriverPlace, String emailId) throws UserDoesNotExistException;
}
