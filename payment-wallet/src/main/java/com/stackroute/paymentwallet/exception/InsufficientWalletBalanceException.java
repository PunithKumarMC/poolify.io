package com.stackroute.paymentwallet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST ,reason = "Insufficient Balance")
public class InsufficientWalletBalanceException extends Exception {
}
