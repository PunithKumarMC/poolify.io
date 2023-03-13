package com.niit.paymentgateway.repository;
import com.niit.paymentgateway.model.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<ClientOrder, Long> {

	ClientOrder findByRazorpayOrderId(String orderId);
}
