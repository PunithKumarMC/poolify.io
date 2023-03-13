package com.niit.paymentgateway.model;

import lombok.Data;

@Data
public class RequestOrder {
	private String customerName;
	private String email;
	private String phoneNumber;
	private String amount;
}
