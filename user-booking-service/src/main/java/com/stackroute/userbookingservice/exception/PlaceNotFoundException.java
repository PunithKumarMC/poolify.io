package com.stackroute.userbookingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Entered place is not found, Please Enter the correct Place name to proceed further")
public class PlaceNotFoundException extends Exception{
}
