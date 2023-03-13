package com.stackroute.ridefinishednotification.Domain;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Bookings {
	private String passengerId;
	private String rideFinished;
}
