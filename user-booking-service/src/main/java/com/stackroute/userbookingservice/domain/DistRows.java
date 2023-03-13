package com.stackroute.userbookingservice.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DistRows {
    @JsonProperty("elements")
    public DistElements[] elements;
}
