package com.stackroute.userauthenticationservice.service;



import com.stackroute.userauthenticationservice.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String,String> generateToken(User user);
}
