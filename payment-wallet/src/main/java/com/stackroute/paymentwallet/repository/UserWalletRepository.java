package com.stackroute.paymentwallet.repository;

import com.stackroute.paymentwallet.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserWalletRepository extends MongoRepository<Wallet,String>{

	@Override
	Optional<Wallet> findById(String email);
}
