package com.stackroute.paymentwallet.service;

import com.stackroute.paymentwallet.exception.InsufficientWalletBalanceException;
import com.stackroute.paymentwallet.exception.WalletAlreadyExistsException;
import com.stackroute.paymentwallet.model.Wallet;
import com.stackroute.paymentwallet.repository.UserWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class WalletServiceImpl implements WalletService {

	UserWalletRepository userWalletRepository;
    @Autowired
	public WalletServiceImpl(UserWalletRepository userWalletRepository) {
		this.userWalletRepository = userWalletRepository;
	}

	@Override
	public Wallet registerWallet(Wallet wallet) throws WalletAlreadyExistsException {
		if (userWalletRepository.findById(wallet.getEmailId()).isPresent()) {
             throw new WalletAlreadyExistsException();
		}
		else {
			//when user will click activate wallet set this
//			wallet.setEmail("we will get this from frontend");
//			wallet.setInitialBalance(200);
//			wallet.setName("We will get this from frontend");

			List<Double> updateWallet=new ArrayList<>();

			updateWallet.add(200.0);
			wallet.setTransactionHistory(updateWallet);

			return userWalletRepository.save(wallet);
		}

	}

	@Override
	public Wallet addToWallet(String email,Double addMoney) {
		Wallet wallet=new Wallet();
		wallet=userWalletRepository.findById(email).get();
		List<Double> updateWallet=wallet.getTransactionHistory();
		double previousBalance=updateWallet.get(updateWallet.size()-1);
    	updateWallet.add(previousBalance+addMoney);
		double balance=updateWallet.get(updateWallet.size()-1);
		wallet.setBalance(balance);
		wallet.setTransactionHistory(updateWallet);
		return userWalletRepository.save(wallet);

	}

	@Override
	public Wallet deductFromWallet(String email, Double deductMoney) throws InsufficientWalletBalanceException {
		Wallet wallet=new Wallet();
		try {
			wallet=userWalletRepository.findById(email).get();
			List<Double> updateWallet=wallet.getTransactionHistory();
			double previousBalance=updateWallet.get(updateWallet.size()-1);
			if (previousBalance-deductMoney<=0) {
				throw new InsufficientWalletBalanceException();
			}
			else {
				updateWallet.add(previousBalance - deductMoney);
				wallet.setTransactionHistory(updateWallet);
				double balance = updateWallet.get(updateWallet.size() - 1);
				wallet.setBalance(balance);
				return userWalletRepository.save(wallet);
			}
		}
		catch (InsufficientWalletBalanceException e){
			throw new InsufficientWalletBalanceException();
		}
	}

	@Override
	public Wallet getTransactionHistoryFromDb(String email) {
		System.out.println(userWalletRepository.findById(email).get());
		return userWalletRepository.findById(email).get();
	}

}
