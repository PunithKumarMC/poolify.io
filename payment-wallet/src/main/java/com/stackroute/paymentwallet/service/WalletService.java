package com.stackroute.paymentwallet.service;


import com.stackroute.paymentwallet.exception.InsufficientWalletBalanceException;
import com.stackroute.paymentwallet.exception.WalletAlreadyExistsException;
import com.stackroute.paymentwallet.model.Wallet;

public interface WalletService {
	public Wallet registerWallet(Wallet wallet) throws WalletAlreadyExistsException;
	public Wallet addToWallet(String email , Double addMoney);
	public Wallet deductFromWallet(String email,Double deductMoney) throws InsufficientWalletBalanceException;
	Wallet getTransactionHistoryFromDb(String email);
}
