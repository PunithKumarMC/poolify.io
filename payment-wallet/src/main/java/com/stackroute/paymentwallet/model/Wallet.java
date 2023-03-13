package com.stackroute.paymentwallet.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Wallet {
	@Id
	String emailId;
	String name;
	Double balance;
	List <Double> transactionHistory;


}
