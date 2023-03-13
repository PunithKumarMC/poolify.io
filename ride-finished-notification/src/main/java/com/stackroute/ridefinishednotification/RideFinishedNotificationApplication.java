package com.stackroute.ridefinishednotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class RideFinishedNotificationApplication {

	public static void main(String[] args) {
		SpringApplication.run(RideFinishedNotificationApplication.class, args);
	}

}
