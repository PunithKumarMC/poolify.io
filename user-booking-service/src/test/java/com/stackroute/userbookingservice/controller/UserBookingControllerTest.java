//package com.stackroute.userbookingservice.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.userbookingservice.domain.UserBooking;
//import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
//import com.stackroute.userbookingservice.service.UserBookingService;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.awt.*;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@ExtendWith(MockitoExtension.class)
//public class UserBookingControllerTest {
//    UserBooking userBooking1,userBooking2,userBooking3,userBooking4;
//    @Autowired
//    private MockMvc mockMvc;
//    @Mock
//    private UserBookingService userBookingService;
//
//    @InjectMocks
//    private UserBookingController userBookingController;
//
//    private static String jsonToString(UserBooking userBooking){
//        String jsonContent = null;
//        try{
//            ObjectMapper objectMapper=new ObjectMapper();
//            jsonContent=objectMapper.writeValueAsString(userBooking);
//        }catch (JsonProcessingException j){
//            throw new RuntimeException(j);
//        }
//        return jsonContent;
//    }
//    private static String jsonToString1(UserBooking userBooking){
//        String jsonContent = null;
//        try{
//            ObjectMapper objectMapper=new ObjectMapper();
//            jsonContent=objectMapper.writeValueAsString(userBooking);
//        }catch (JsonProcessingException j){
//            throw new RuntimeException(j);
//        }
//        return jsonContent;
//    }
//    //Test case for passenger and Driver Details
//    @BeforeEach
//    public  void SetUp(){
//        userBooking1=new UserBooking(1,"punith@gmail.com","Mysore","Bangalore",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",43.0);
//        userBooking2=new UserBooking(2,"kumar@gmail.com","Delhi","Pune",450.0,3,"Sedan","Passenger",true,"22-01-2005","11:30",251.0);
//        userBooking3=new UserBooking(3,"alan@gmail.com","whitefield","BMR Layout",84.1,1,"HatchBAck","Driver",false,"22-01-2005","11:30",650.0);
//        userBooking4=new UserBooking(4,"michael@gmail.com","Mangalore","Bangalore",346.8,4,"SUV","Driver",false,"22-01-2005","11:30",158.0);
//        mockMvc = MockMvcBuilders.standaloneSetup(userBookingController).build();
//    }
//    @AfterEach
//    public void tearDown(){
//        userBooking1=null;
//        userBooking2=null;
//        userBooking3=null;
//        userBooking4=null;
//    }
//    //Test cases for checking the data whether storing in database
//    @Test
//    public void testUserBookingDetailsToSaveAndReturn() throws Exception {
//    when(userBookingService.addBookingDetails(any())).thenReturn(any());
//    mockMvc.perform(post("/saveUser").contentType(MediaType.APPLICATION_JSON).content(jsonToString(userBooking1))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
//    verify(userBookingService,times(1)).addBookingDetails(userBooking1);
//    }
//
//    @Test
//    public void testUserBookingUpdateMethod() throws Exception {
//        when(userBookingService.updateBookingDetails(any())).thenReturn(any());
//        mockMvc.perform(put("/updateUsers").contentType(MediaType.APPLICATION_JSON).content(jsonToString(userBooking1))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
//        verify(userBookingService,times(1)).updateBookingDetails(userBooking1);
//    }
//
//    @Test
//    public void testGetAllUsers() throws Exception {
//        when(userBookingService.getAllBookingDetails()).thenReturn(List.of());
//        mockMvc.perform(get("/getAllUsers").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(userBookingService,times(1)).getAllBookingDetails();
//    }
//
//    @Test
//    public void getDetailsOfuser() throws Exception {
//        when(userBookingService.getBookingDetailsOfUser(anyString())).thenReturn(any());
//        mockMvc.perform(get("/getDataOfUser/test@gmail.com").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(userBookingService,times(1)).getBookingDetailsOfUser("test@gmail.com");
//    }
//
//    @Test
//    public void deleteUser() throws Exception {
//        when(userBookingService.deleteBookingDetails(anyString())).thenReturn(false);
//        mockMvc.perform(delete("/deleteUser/test@gmail.com").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(userBookingService,times(1)).deleteBookingDetails("test@gmail.com");
//    }
//
//
//
//
//
//
//}
