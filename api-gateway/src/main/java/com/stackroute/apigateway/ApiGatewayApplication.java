package com.stackroute.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
//@Bean
//	public RouteLocator route(RouteLocatorBuilder builder)
//	{
//		return builder.routes()
//				.route(p->p.path("/api/v1/**").uri("lb://user-authentication-service"))
//				.route(p->p.path("/api/v2/**").uri("lb://user-registration-service"))
//				.route(p->p.path("/api/v3").uri("https:localhost//8081"))
//				.route(p->p.path("api/v4").uri("https:localhost//"))
//				.build();
//	}
}

