package com.stackroute.paymentwallet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class PaymentWalletApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentWalletApplication.class, args);
		System.out.println("here");
	}

}
