package com.stackroute.userauthenticationservice.rabbitMq;

import com.stackroute.userauthenticationservice.domain.User;
import com.stackroute.userauthenticationservice.service.UserService;
import com.stackroute.userauthenticationservice.service.UserServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
	@Autowired
	private UserServiceImpl userService;
	@RabbitListener(queues = "RegisterQueue")
	public void getDtoAndAddToDb(UserDto userDto){
		User user=new User();
		user.setEmailId(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		userService.saveUser(user);

	}
}
