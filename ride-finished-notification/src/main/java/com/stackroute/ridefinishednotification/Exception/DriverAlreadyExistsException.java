package com.stackroute.ridefinishednotification.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FOUND , reason = "Driver Already Exists")
public class DriverAlreadyExistsException extends Exception {
}
