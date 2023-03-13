package com.stackroute.userauthenticationservice.repository;


import com.stackroute.userauthenticationservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByEmailIdAndPassword(String emailId , String password);
}