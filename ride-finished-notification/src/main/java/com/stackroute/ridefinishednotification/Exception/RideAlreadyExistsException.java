package com.stackroute.ridefinishednotification.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND , reason = "Ride Already exists")
public class RideAlreadyExistsException extends Exception {
}
