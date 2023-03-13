package com.niit.registration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



@ResponseStatus(value = HttpStatus.CONFLICT,reason = "User Already Exits")
public class UserAlreadyExistsException extends Exception {

}
