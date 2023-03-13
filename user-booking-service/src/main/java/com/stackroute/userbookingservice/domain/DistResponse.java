package com.stackroute.userbookingservice.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DistResponse {
    @JsonProperty("origin_addresses")
    public String[] origin_addresses;
    @JsonProperty("destination_addresses")
    public String[] destination_addresses;

    @JsonProperty("rows")
    public DistRows[] rows;
}
