package com.niit.registration;

import com.niit.registration.model.Address;

import com.niit.registration.model.UserType;
import com.niit.registration.model.Vehicle;
import com.niit.registration.model.personalDetails;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient

public class UserRegistrationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserRegistrationServiceApplication.class, args);
//		personalDetails pd=new personalDetails("fsd","das","das","asd",46545,
//				new Address("das","das","sda","das",654), UserType.OWNER,
//				new Vehicle("dsa","das","daas", Vehicle.VType.SUV,2015));
	}
}
