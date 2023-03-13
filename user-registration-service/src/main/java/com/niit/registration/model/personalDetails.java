package com.niit.registration.model;

import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class personalDetails {
	private String firstName;
	private String lastName;
	private String DOB;
	private String gender;
	private long contactNo;
	private UserType userType;
	private Address Address;
	private Vehicle vehicleDetails;

}
