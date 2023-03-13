package com.stackroute.userauthenticationservice.controller;


import com.stackroute.userauthenticationservice.domain.User;
import com.stackroute.userauthenticationservice.exception.UserNotFoundException;
//import com.stackroute.userauthenticationservice.service.ChatRoomService;

import com.stackroute.userauthenticationservice.service.SecurityTokenGenerator;
import com.stackroute.userauthenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/v1")
//@CrossOrigin
public class UserController {

    private ResponseEntity responseEntity;
    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;


    @Autowired
    public UserController(UserService userService , SecurityTokenGenerator securityTokenGenerator)
    {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) throws UserNotFoundException {

        Map<String, String> map = null;
        try {
            User userObj = userService.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
            if (userObj.getEmailId().equals(user.getEmailId())) {
                map = securityTokenGenerator.generateToken(user);
            }
            responseEntity = new ResponseEntity(map, HttpStatus.OK);
        }
        catch(UserNotFoundException e){
            System.out.println("user not found");
            throw new UserNotFoundException();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity("Try after sometime!!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    // first step - register the user
    @PostMapping("/api/v2/register")
    public ResponseEntity saveUser(@RequestBody User user) throws InterruptedException {
        //Thread.sleep(120000);
        User createdUser = userService.saveUser(user);
        return responseEntity = new ResponseEntity("User Created" , HttpStatus.CREATED);
    }
    public ResponseEntity registerFail(@RequestBody User user) {
        return responseEntity = new ResponseEntity("Service down, Registration failed-Please try after sometime" , HttpStatus.CREATED);
    }


    @GetMapping("/api/v2/userservices/users")
    public ResponseEntity getAllUsers(HttpServletRequest request){

        List<User> list =  userService.getAllUsers();
        responseEntity = new ResponseEntity(list,HttpStatus.OK);
        return responseEntity;

    }



}
