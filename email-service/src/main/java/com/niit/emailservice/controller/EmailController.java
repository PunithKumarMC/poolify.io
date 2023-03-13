package com.niit.emailservice.controller;

import com.niit.emailservice.model.Email;
import com.niit.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/mail")

//@CrossOrigin
public class EmailController {

    ResponseEntity responseEntity;

    @Autowired
    private EmailService emailService;


    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMail(@RequestBody Email email)
    {
        System.out.println("i am here");
        String status
                = emailService.sendMail(email);

        return new ResponseEntity<>(email, HttpStatus.OK);
    }


}
