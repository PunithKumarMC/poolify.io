package com.niit.paymentgateway.controller;
import java.math.BigDecimal;
import java.math.RoundingMode;

import com.niit.paymentgateway.model.ClientOrder;
import com.niit.paymentgateway.model.PaymentResponse;
import com.niit.paymentgateway.model.RequestOrder;
import com.niit.paymentgateway.model.ResponseOrder;
import com.niit.paymentgateway.service.OrderService;
import com.niit.paymentgateway.config.RazorPayClientConfig;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;



@RestController
@RequestMapping("/api")
@Slf4j
//@CrossOrigin
public class OrderController {

	private RazorpayClient client;
	private ResponseEntity responseEntity;

	private RazorPayClientConfig razorPayClientConfig;

	@Autowired
	private OrderService orderService;


	@Autowired
	public OrderController(RazorPayClientConfig razorpayClientConfig) throws RazorpayException {
		this.razorPayClientConfig = razorpayClientConfig;
		this.client = new RazorpayClient(razorpayClientConfig.getKey(), razorpayClientConfig.getSecret());
	}

	@PostMapping("/order")
	public ResponseEntity<?> createOrder(@RequestBody RequestOrder orderRequest) {
		ResponseOrder razorPay = null;
		try {
			// The transaction amount is expressed in the currency subunit, such
			// as paise (in case of INR)
			String amountInPaise = convertRupeeToPaise(orderRequest.getAmount());
			// Create an order in RazorPay and get the order id
			Order order = createRazorPayOrder(amountInPaise);
			razorPay = getOrderResponse(order.get("id"),amountInPaise);
			// Save order in the database
			System.out.println("create order controller");
			orderService.saveOrder(razorPay.getRazorpayOrderId());
		} catch (RazorpayException e) {
			log.error("Exception while create payment order", e);
			return new ResponseEntity<>(( "Error while create payment order: " + e.getMessage()), HttpStatus.EXPECTATION_FAILED);
		}
		System.out.println("creating order1");
		return ResponseEntity.ok(razorPay);
	}

	@PutMapping("/order")
	public ResponseEntity<?> updateOrder(@RequestBody PaymentResponse paymentResponse) {
		String errorMsg = orderService.validateAndUpdateOrder(paymentResponse.getRazorpayOrderId(), paymentResponse.getRazorpayPaymentId(), paymentResponse.getRazorpaySignature(),
				razorPayClientConfig.getSecret());
		if (errorMsg != null) {
			System.out.println(errorMsg);
			return new ResponseEntity<>(errorMsg, HttpStatus.BAD_REQUEST);
		}
		System.out.println("hitting update");
		System.out.println(errorMsg);
		return new ResponseEntity<>(paymentResponse.getRazorpayPaymentId(),HttpStatus.OK);
		//return ResponseEntity.ok(new ApiResponse(true, paymentResponse.getRazorpayPaymentId()));
	}

	private ResponseOrder getOrderResponse(String orderId, String amountInPaise) {
		ResponseOrder razorPay = new ResponseOrder();
		razorPay.setApplicationFee(amountInPaise);
		razorPay.setRazorpayOrderId(orderId);
		razorPay.setSecretKey(razorPayClientConfig.getKey());
		System.out.println("get order response");
		return razorPay;
	}

	private Order createRazorPayOrder(String amount) throws RazorpayException {
		JSONObject options = new JSONObject();
		options.put("amount", amount);
		options.put("currency", "INR");
		options.put("receipt", "txn_123456");
		System.out.println("create razorpay order");
		return client.orders.create(options);
	}

	private String convertRupeeToPaise(String paise) {
		BigDecimal b = new BigDecimal(paise);
		BigDecimal value = b.multiply(new BigDecimal("100"));
		System.out.println("convert rupee to paise");
		return value.setScale(0, RoundingMode.UP).toString();
	}
}
