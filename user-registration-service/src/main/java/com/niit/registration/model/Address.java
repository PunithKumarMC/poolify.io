package com.niit.registration.model;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data

public class Address {

    String streetAdd;
    String country;
    String city;
    String state;
    int zipCode;
}

