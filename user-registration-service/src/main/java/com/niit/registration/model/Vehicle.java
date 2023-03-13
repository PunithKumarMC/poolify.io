package com.niit.registration.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Vehicle {
	String vehName;
	String vehNumber;
	String dlNumber;
	VType vehType;

	public enum VType{
		SUV,
		Sedan,
		HatchBack,
		MUV
	}
}
