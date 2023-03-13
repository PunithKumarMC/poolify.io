package com.stackroute.userauthenticationservice.service;


import com.stackroute.userauthenticationservice.domain.User;
import com.stackroute.userauthenticationservice.exception.UserNotFoundException;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public User findByEmailIdAndPassword(String email, String password) throws UserNotFoundException;
    List<User> getAllUsers();
}
