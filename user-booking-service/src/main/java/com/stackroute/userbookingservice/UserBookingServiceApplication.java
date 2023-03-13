package com.stackroute.userbookingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class UserBookingServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserBookingServiceApplication.class, args);
	}

}
