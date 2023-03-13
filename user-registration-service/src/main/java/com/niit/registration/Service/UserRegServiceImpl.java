package com.niit.registration.Service;

import com.niit.registration.repository.UserRegistrationRepository;
import com.niit.registration.exception.UserAlreadyExistsException;
import com.niit.registration.exception.UserNotFoundException;
import com.niit.registration.model.ProfilePhoto;
import com.niit.registration.model.User;
import com.niit.registration.model.personalDetails;
import com.niit.registration.rabbitMq.Producer;
import com.niit.registration.rabbitMq.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
@Service
public class UserRegServiceImpl implements UserRegService {
	UserRegistrationRepository userRegistrationRepository;
	@Autowired
	private Producer producer;
	@Autowired
	public UserRegServiceImpl(UserRegistrationRepository userRegistrationRepository) {
		this.userRegistrationRepository = userRegistrationRepository;
	}

	@Override
	public User registerUser(User user) throws UserAlreadyExistsException {
		User save = new User();
		try {
			if(userRegistrationRepository.findById(user.getEmail()).isPresent()){
				throw new UserAlreadyExistsException();
			}

			else {
				UserDto userDto=new UserDto();
				userDto.setEmail(user.getEmail());
				userDto.setPassword(user.getPassword());
				producer.sendMsgTorabbitMqServer(userDto);
				save= userRegistrationRepository.save(user);
			}
		}
		catch (UserAlreadyExistsException ex){
			System.out.println("user Already exists, try logging in"+ ex);
			throw new UserAlreadyExistsException();
		}
		return save;
	}

	@Override
	public User savePersonalDetails(String email, personalDetails prsnlDetails) throws UserNotFoundException {
		User user=new User();
		try {
			if(userRegistrationRepository.findByEmail(email).isEmpty()){
				throw new UserNotFoundException();
			}
			user=userRegistrationRepository.findByEmail(email).get();
//       if (user.getUpdateDetails()==null){
//          user.setUpdateDetails(Arrays.asList(prsnlDetails));
//       }
//       else{
//          personalDetails personalDetailsList=user.getUpdateDetails();
//          personalDetailsList.add(prsnlDetails);
//       user.setUpdateDetails(personalDetailsList);
//       }

				user.setUpdateDetails(prsnlDetails);
//				user.setProfilePhoto(profilePhoto);


		}
		catch (UserNotFoundException e) {
			System.out.println("create this user first");
			throw new UserNotFoundException();

		}

		return userRegistrationRepository.save(user);
	}



	@Override
	public Optional<User> getUserByEmail(String email) throws UserNotFoundException {
		if (userRegistrationRepository.findByEmail(email).isEmpty()){
			throw new UserNotFoundException();
		}else {
			return userRegistrationRepository.findByEmail(email);
		}
	}

	@Override
	public User uploadImage(String emailId,MultipartFile file) throws IOException {
		ProfilePhoto profilePhoto=new ProfilePhoto(file.getOriginalFilename(), file.getContentType(), file.getBytes());
		User user=userRegistrationRepository.findById(emailId).get();
		user.setProfilePhoto(profilePhoto);

		return userRegistrationRepository.save(user);
	}

}