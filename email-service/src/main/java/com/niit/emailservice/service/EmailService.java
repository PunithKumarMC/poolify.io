package com.niit.emailservice.service;

import com.niit.emailservice.model.Email;

public interface EmailService {

    //Method
    //To send a simple mail
    String sendMail(Email email);
}
