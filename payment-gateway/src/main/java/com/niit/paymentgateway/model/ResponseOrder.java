package com.niit.paymentgateway.model;

import lombok.Data;

@Data
public class ResponseOrder {
	private String applicationFee;
	private String razorpayOrderId;
	private String secretKey;
}
