package com.stackroute.userbookingservice.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Result {
    @JsonProperty("formatted_address")
    public String address;
    @JsonProperty("geometry")
    public Geometry geometry;                 //same name should be there or use json property
}
