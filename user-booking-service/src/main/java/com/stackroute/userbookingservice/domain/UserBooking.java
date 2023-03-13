package com.stackroute.userbookingservice.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class UserBooking {
    @Transient
    public static final String SEQUENCE_NAME="user_sequence";

    private int bookingId;
    @Id
    private String emailId;
//    private int registerId;
//    @Transient                         //these co-ordinates will not be stored in database
    private String fromPlace;
//    @Transient
    private String toPlace;
    private Double distance;
    private int noOfSeatsRequired;
    private String vehicleType;
    private String serviceType;      //this attribute should be selected automatically so that we can maintain teo separate collections for driver and passenger
    private boolean reqInsurance;
    private String bookedDate;
    private String bookedTime;
    private Double price;
}
