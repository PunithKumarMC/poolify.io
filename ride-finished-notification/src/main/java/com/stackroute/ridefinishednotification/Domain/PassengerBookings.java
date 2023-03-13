package com.stackroute.ridefinishednotification.Domain;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PassengerBookings {
	private String driverEmail;
	private String rideFinish;
}
