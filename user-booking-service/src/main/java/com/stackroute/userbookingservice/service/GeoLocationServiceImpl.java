package com.stackroute.userbookingservice.service;

import com.google.gson.Gson;
import com.stackroute.userbookingservice.domain.DistResponse;
import com.stackroute.userbookingservice.domain.Location;
import com.stackroute.userbookingservice.domain.Response;
import com.stackroute.userbookingservice.domain.UserBooking;
import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
import com.stackroute.userbookingservice.repository.DistPlacesNamesRepository;
import com.stackroute.userbookingservice.repository.GeoLocationRepository;
import com.stackroute.userbookingservice.repository.UserBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GeoLocationServiceImpl implements GeoLocationService {
    private static final Object API_KEY = "";
    private DistPlacesNamesRepository distPlacesNamesRepository;
    private GeoLocationRepository geoLocationRepository;
    private UserBookingRepository userBookingRepository;

    @Autowired
    public GeoLocationServiceImpl(DistPlacesNamesRepository distPlacesNamesRepository, GeoLocationRepository geoLocationRepository, UserBookingRepository userBookingRepository) {
        this.distPlacesNamesRepository = distPlacesNamesRepository;
        this.geoLocationRepository = geoLocationRepository;
        this.userBookingRepository = userBookingRepository;
    }

    public boolean matchingRoutes(String fromPlace, String toPlace, String emailId) {
        List<DistResponse> dist = distPlacesNamesRepository.findAll();
        return false;
    }

    //methods
    @Override
    public DistResponse getDistanceAndSaveDetails(String fromPlace, String toPlace, String emailId) throws UserDoesNotExistException {
        Gson gson = new Gson();
        DistResponse result = null;
        try {
            result = gson.fromJson(jsonCoordDistance(URLEncoder.encode(fromPlace, "UTF-8"), (URLEncoder.encode(toPlace, "UTF-8"))), DistResponse.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(result);
        String text = result.rows[0].elements[0].distance.text;
        String digits = text.replaceAll("[^0-9.]", "");
        Double distance = Double.parseDouble(digits);
        System.out.println(digits + "double value");
        UserBooking userBooking = new UserBooking();

        Optional<UserBooking> u = userBookingRepository.findByEmailId(emailId);
        if (u.isPresent()) {
            double price = distance * 6;
            u.get().setFromPlace(fromPlace);
            u.get().setToPlace(toPlace);
            u.get().setDistance(distance);
            u.get().setPrice(price);
            u.get().setEmailId(emailId);
            System.out.println("from place" + fromPlace);
            System.out.println("distance saved");
            userBookingRepository.save(u.get());
        } else {
            throw new UserDoesNotExistException();
        }
        return result;
    }

    public List<UserBooking> fetchalluser() {
        return userBookingRepository.findAll();
    }

    //supporting method for getDistanceAndSaveDetails
    private String jsonCoordDistance(String fromplace, String toplace) throws IOException, MalformedURLException {
        URL url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + fromplace + "&destinations=" + toplace + "&key=" + API_KEY);
        URLConnection connection = url.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        String jsonResult = "";
        while ((inputLine = in.readLine()) != null) {
            jsonResult += inputLine;
        }
        in.close();
        System.out.println(jsonResult);
        return jsonResult;
    }

    @Override
    public Location getLocationAndSaveDetails(String address) {
        Gson gson = new Gson();
        Response result = null;
        try {
            result = gson.fromJson(jsonCoord(URLEncoder.encode(address, "UTF-8")), Response.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.printf("joson " + result);
        double lat = Double.parseDouble(result.results[0].geometry.location.lat);
        double lng = Double.parseDouble(result.results[0].geometry.location.lng);
        Location location = new Location(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng);

        System.out.printf("%20s %20s  ", "" + lat, "" + lng);
        return location;
    }

    //supporting method for getLocationAndSaveDetails
    private String jsonCoord(String address) throws IOException, MalformedURLException {
        URL url = new URL("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false" + "&key=" + API_KEY);
        URLConnection connection = url.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        String jsonResult = "";
        while ((inputLine = in.readLine()) != null) {
            jsonResult += inputLine;
        }
        in.close();
        System.out.println(jsonResult);
        return jsonResult;
    }


    //methods for route matching
    public double findDistanceBetweenPlaces(String fromPlace, String toPlace) {
        Gson gson = new Gson();
        DistResponse result = null;
        try {
            result = gson.fromJson(jsonCoordDistance(URLEncoder.encode(fromPlace, "UTF-8"), (URLEncoder.encode(toPlace, "UTF-8"))), DistResponse.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        Double distance = Double.valueOf(result.rows[0].elements[0].distance.text);
        String text = result.rows[0].elements[0].distance.text;
        String digits = text.replaceAll("[^0-9.]", "");
        Double distance = Double.parseDouble(digits);
        System.out.println("check " + digits);
        return distance;
    }

    public double findTotalDistance(String fromDriverPlace, String fromPassengerPlace, String toPassengerPlace, String toDriverPlace) {
        return findDistanceBetweenPlaces(fromDriverPlace, fromPassengerPlace) + findDistanceBetweenPlaces(fromPassengerPlace, toPassengerPlace) + findDistanceBetweenPlaces(toPassengerPlace, toDriverPlace);
    }

    public boolean checkPaths(String fromDriverPlace, String fromPassengerPlace, String toPassengerPlace, String toDriverPlace) {
        boolean flag = false;
        double a = findDistanceBetweenPlaces(fromDriverPlace, toDriverPlace);
        double b = findTotalDistance(fromDriverPlace, fromPassengerPlace, toPassengerPlace, toDriverPlace);
        a = a + 30 % a;
        if (a >= b) {
            flag = true;
        }
        System.out.printf("flag" + flag);
        return flag;
    }

    //finding carDrivers
    @Override
    public List<String> fetchDriverDetailsForMatchingPassenger(String fromPassengerPlace, String toPassengerPlace, String emailId) throws UserDoesNotExistException {


        Optional<UserBooking> passengerList = userBookingRepository.findByEmailId(emailId);
        List<String> emailsOfDriver = new ArrayList<>();
        if (passengerList.isPresent()) {
            List<UserBooking> u1 = userBookingRepository.findAll();
            u1.forEach(o -> {
                System.out.println(o.getFromPlace() + " from place");
                String serviceType = o.getServiceType();
                if (serviceType.equalsIgnoreCase("CarDriver")) {
                    if (passengerList.get().getNoOfSeatsRequired() <= o.getNoOfSeatsRequired()) {
//                        if (o.getVehicleType().equalsIgnoreCase(passengerList.get().getVehicleType())) {
                            boolean b = checkPaths(o.getFromPlace(), fromPassengerPlace, toPassengerPlace, o.getToPlace());
                            if (b) {
                            emailsOfDriver.add(o.getEmailId());
                            }
//                        }
                    }
                }
            });
        } else {
            throw new UserDoesNotExistException();
        }
        System.out.println((long) emailsOfDriver.size() + "emails  +");
        return emailsOfDriver;
    }

    @Override
    public List<String> fetchPassengerDetailsForMatchingDriver(String fromDriverPlace, String toDriverPlace, String emailId) throws UserDoesNotExistException {
//        Optional<UserBooking> u= userBookingRepository.findByEmailId(emailId);
//        if (u.isPresent()) {
//            u.get().setFromPlace(fromDriverPlace.toLowerCase());
//            u.get().setToPlace(toDriverPlace.toLowerCase());
////            u.get().setDistance(distance);
////            userBooking.setEmailId(emailId);
//            userBookingRepository.save(u.get());
//        }else {
//            throw new UserDoesNotExistException();
//        }
        Optional<UserBooking> Driver = userBookingRepository.findByEmailId(emailId);
        System.out.println(Driver + "driver name");
        List<String> emailsOfDriver = new ArrayList<>();
        if (Driver.isPresent()) {
            List<UserBooking> u1 = userBookingRepository.findAll();
            u1.forEach(o -> {
                System.out.println(o.getFromPlace() + " from place");
                String serviceType = o.getServiceType();
                if (serviceType.equalsIgnoreCase("passenger")) {
                    if (Driver.get().getNoOfSeatsRequired()>=o.getNoOfSeatsRequired()) {
//                        if (o.getVehicleType().equalsIgnoreCase(Driver.get().getVehicleType())) {
                            boolean b = checkPaths(o.getFromPlace(), fromDriverPlace, toDriverPlace, o.getToPlace());
                            if (b) {
                            emailsOfDriver.add(o.getEmailId());
                            }
//                        }
                    }
                }
            });
        } else {
            throw new UserDoesNotExistException();
        }
        System.out.println((long) emailsOfDriver.size() + "emails  +");
        return emailsOfDriver;
    }
}



