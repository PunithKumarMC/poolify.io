package com.niit.registration.repository;

import com.niit.registration.model.Address;
import com.niit.registration.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRegistrationRepository extends MongoRepository<User,String> {
	@Override
	Optional<User> findById(String email);

	Optional<User> findByEmail(String email);
}
