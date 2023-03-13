package com.niit.paymentgateway.service;

import com.niit.paymentgateway.model.ClientOrder;
import com.niit.paymentgateway.repository.OrderRepository;
import com.niit.paymentgateway.utilities.Signature;
import com.razorpay.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Transactional
	public ClientOrder saveOrder(final String razorpayOrderId) {
		ClientOrder clientOrder=new ClientOrder();
		clientOrder.setRazorpayOrderId(razorpayOrderId);
		System.out.println("creating order");
		return orderRepository.save(clientOrder);
	}

	@Transactional
	public String validateAndUpdateOrder(final String razorpayOrderId, final String razorpayPaymentId, final String razorpaySignature, final String secret) {
		String errorMsg = null;
		try {
			ClientOrder order = orderRepository.findByRazorpayOrderId(razorpayOrderId);
			// Verify if the razorpay signature matches the generated one to
			// confirm the authenticity of the details returned
			String generatedSignature = Signature.calculateRFC2104HMAC(order.getRazorpayOrderId() + "|" + razorpayPaymentId, secret);
			if (generatedSignature.equals(razorpaySignature)) {
				order.setRazorpayOrderId(razorpayOrderId);
				order.setRazorpayPaymentId(razorpayPaymentId);
				order.setRazorpaySignature(razorpaySignature);
				//order.setUserId(123456780L);
				orderRepository.save(order);
				System.out.println("validate and update");
			} else {
				errorMsg = "Payment validation failed: Signature doesn't match";
			}
		} catch (Exception e) {
			log.error("Payment validation failed", e);
			errorMsg = e.getMessage();
		}
		return errorMsg;
	}
}
