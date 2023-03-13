package com.stackroute.bookedhistory.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class BookedHistory {
    @Id
    private String emailId;
    private List<String> fromPlace;
    private List<String> toPlace;
    private List<String> vehicleType;
    private List<String> vehNumber;
    private List<String> estimatedPrice;
    private List<String>  paymentMedium;
    private List<Integer> rating;

}
