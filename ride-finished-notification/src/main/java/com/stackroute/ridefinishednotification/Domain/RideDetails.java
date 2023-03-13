package com.stackroute.ridefinishednotification.Domain;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RideDetails {
	@Id
	private String driverId;
	private List<Bookings> booking;
	private int noOfSeats;


}
