package com.stackroute.paymentwallet.controller;


import com.stackroute.paymentwallet.exception.InsufficientWalletBalanceException;
import com.stackroute.paymentwallet.exception.WalletAlreadyExistsException;
import com.stackroute.paymentwallet.model.Wallet;
import com.stackroute.paymentwallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
@RequestMapping("/wallet/v1")
public class WalletController {
	ResponseEntity responseEntity;
	WalletService walletService;
	@Autowired
	public WalletController(WalletService walletService) {
		this.walletService = walletService;
	}
	@PostMapping("/register")
	public ResponseEntity<?> registerWallet(@RequestBody Wallet wallet){
		try {
			walletService.registerWallet(wallet);
			return new ResponseEntity<>(wallet, HttpStatus.OK);
		}
		catch (WalletAlreadyExistsException e) {
			return new ResponseEntity<>("user already exist",HttpStatus.CONFLICT);
		}
	}
	@PostMapping("/update/add/{email}")
	public ResponseEntity<?> updateWallet(@PathVariable String email,@RequestBody Double money){
		System.out.println("add money"+money);
		Wallet wallet=new Wallet();
		try {
			wallet=walletService.addToWallet(email,money);
		}
		catch (Exception e){
			return new ResponseEntity<>("bad request",HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(wallet,HttpStatus.OK);
	}
	@PostMapping("/update/deduct/{email}")
	public ResponseEntity<?> deductWallet(@PathVariable String email,@RequestBody Double money){
		Wallet wallet=new Wallet();
		try {
			return new ResponseEntity<>(walletService.deductFromWallet(email,money),HttpStatus.OK);
		} catch (InsufficientWalletBalanceException e) {
			throw new RuntimeException(e);
		}


	}
	@GetMapping("/getTransactionHistory/{email}")
	public ResponseEntity<?> getTransactionHistory(@PathVariable String email){
		return new ResponseEntity<>(walletService.getTransactionHistoryFromDb(email),HttpStatus.OK);
	}
}
