package com.niit.registration.controller;

import com.niit.registration.Service.UserRegService;
import com.niit.registration.exception.UserAlreadyExistsException;
import com.niit.registration.exception.UserNotFoundException;
import com.niit.registration.model.ProfilePhoto;
import com.niit.registration.model.User;
import com.niit.registration.model.personalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("api/v2")
//@CrossOrigin
public class Controller {
	private UserRegService userRegService;
	private ResponseEntity responseEntity;
	@Autowired

	public Controller(UserRegService userRegService) {
		this.userRegService = userRegService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user){
		try {
			userRegService.registerUser(user);
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		catch (UserAlreadyExistsException e){
			System.out.println(e);
			return new ResponseEntity<>("user already exist",HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/register/{email}")
	public ResponseEntity<?> saveVehicle(@PathVariable String email, @RequestBody personalDetails personalDetails){
		try {
			userRegService.savePersonalDetails(email,personalDetails);
			return new ResponseEntity<>(personalDetails,HttpStatus.CREATED);
		}
		catch (UserNotFoundException ex){
			System.out.println(ex);
			return new ResponseEntity<>("User not found, try registering first",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PostMapping("/upload/{email}")
	public ResponseEntity<?> uploadProfilePhoto(@PathVariable String email,@RequestParam("myFile") MultipartFile file) throws IOException {
		userRegService.uploadImage(email,file);
		return new ResponseEntity<>("uploaded",HttpStatus.OK);
	}

	@GetMapping("/getUserByEmail/{email}")
	public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
		System.out.println("check");
		try {
			return new ResponseEntity<>(userRegService.getUserByEmail(email), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			throw new RuntimeException(e);
		}
	}
}