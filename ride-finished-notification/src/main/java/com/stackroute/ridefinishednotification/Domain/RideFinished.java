package com.stackroute.ridefinishednotification.Domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RideFinished {
	@Id
	private String passengerId;
	private List<PassengerBookings> passengerBookings;
}
