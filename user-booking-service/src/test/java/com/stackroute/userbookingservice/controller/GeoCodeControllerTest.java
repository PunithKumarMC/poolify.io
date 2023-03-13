//package com.stackroute.userbookingservice.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.userbookingservice.domain.DistResponse;
//import com.stackroute.userbookingservice.domain.Location;
//import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
//import com.stackroute.userbookingservice.service.GeoLocationService;
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
//import java.io.UnsupportedEncodingException;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class GeoCodeControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//    @Mock
//    private GeoLocationService geoLocationService;
//
//    @InjectMocks
//    private GeocodeController geocodeController;
//
//    @BeforeEach
//    public void setUp(){
//        mockMvc = MockMvcBuilders.standaloneSetup(geocodeController).build();
//    }
//    @AfterEach
//    public void tearDown(){
//
//    }
//
//    private static String jsonToString(Location location) {
//        String jsonContent = null;
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            jsonContent = objectMapper.writeValueAsString(location);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//        return jsonContent;
//    }
//    private static String jsonToString1(DistResponse distResponse) {
//        String jsonContent = null;
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            jsonContent = objectMapper.writeValueAsString(distResponse);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//        return jsonContent;
//    }
//
//
//    @Test
//    public void getGeoDetails() throws Exception {
//        Location location=new Location();
//        when(geoLocationService.getLocationAndSaveDetails(any())).thenReturn(location);
//        mockMvc.perform(get("/getLocation").param("address","mysore").contentType(MediaType.APPLICATION_JSON).content(jsonToString(location))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(geoLocationService,times(1)).getLocationAndSaveDetails(any());
//    }
//
//    @Test
//    public void getDistance() throws Exception {
//        DistResponse distResponse=new DistResponse();
//        when(geoLocationService.getDistanceAndSaveDetails(any(),any(),any())).thenReturn(distResponse);
//        mockMvc.perform(get("/getDistance").param("fromplace","mysore").param("toplace","bangalore").param("emailId","punith@gmail.com").contentType(MediaType.APPLICATION_JSON).content(jsonToString1(distResponse))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(geoLocationService,times(1)).getDistanceAndSaveDetails("mysore","bangalore","punith@gmail.com");
//    }
//
//    @Test
//    public void getDriversForPassengers() throws Exception {
//        when(geoLocationService.fetchDriverDetailsForMatchingPassenger(any(),any(),any())).thenReturn(List.of());
//        mockMvc.perform(get("/getDriversForPassengers").param("fromPlace","mysore").param("toPlace","bangalore").param("emailId","punith@gmail.com")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//        verify(geoLocationService,times(1)).fetchDriverDetailsForMatchingPassenger("mysore","bangalore","punith@gmail.com");
//    }
//
//
//}
