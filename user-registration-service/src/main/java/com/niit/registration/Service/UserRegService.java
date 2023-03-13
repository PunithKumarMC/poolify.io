package com.niit.registration.Service;

import com.niit.registration.exception.UserAlreadyExistsException;
import com.niit.registration.exception.UserNotFoundException;
import com.niit.registration.model.ProfilePhoto;
import com.niit.registration.model.User;
import com.niit.registration.model.personalDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


public interface UserRegService {
	public User registerUser(User user) throws UserAlreadyExistsException;
	public User savePersonalDetails(String email, personalDetails personalDetails) throws UserNotFoundException;


	Optional<User> getUserByEmail(String email) throws UserNotFoundException;

	public User uploadImage(String emailId,MultipartFile file) throws IOException;
}
