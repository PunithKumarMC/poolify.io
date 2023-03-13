package com.stackroute.ridefinishednotification.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR , reason = "Driver does not Exists")
public class DriverDoesNotExistsException extends Exception {
}
