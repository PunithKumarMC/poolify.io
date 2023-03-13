//package com.stackroute.userbookingservice.service;
//
//import com.stackroute.userbookingservice.domain.UserBooking;
//import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
//import com.stackroute.userbookingservice.repository.GeoLocationRepository;
//import com.stackroute.userbookingservice.repository.UserBookingRepository;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.junit.jupiter.api.function.Executable;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.List;
//import java.util.Optional;
//
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyList;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class GeoLocationServiceTest {
//    UserBooking userBooking;
//    @Mock
//    private GeoLocationRepository geoLocationRepository;
//    @Mock
//    private UserBookingRepository userBookingRepository;
//    @InjectMocks
//    private GeoLocationServiceImpl geoLocationServiceimpl;
//
//    @BeforeEach
//    public void setUp(){
//        userBooking=new UserBooking(1,"punith@gmail.com","Mysore","Bangalore",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",58.0);
//
//    }
//    @AfterEach
//    public void tearDown(){
//
//    }
//
//    @Test
//    public void fetchDriverDetails() throws UserDoesNotExistException {
//        when(userBookingRepository.findAll()).thenReturn(List.of());
//        when(userBookingRepository.findByEmailId(any())).thenReturn(Optional.ofNullable(userBooking));
//        assertEquals(anyList(),geoLocationServiceimpl.fetchDriverDetailsForMatchingPassenger("mysore","bangalore","punith@gmail.com"));
//        verify(userBookingRepository,times(1)).findByEmailId("punith@gmail.com");
//        verify(userBookingRepository,times(1)).findAll();
//    }
//    @Test
//    public void fetchDriverDetailsNegative() throws UserDoesNotExistException {
//        when(userBookingRepository.findAll()).thenReturn(List.of());
//        when(userBookingRepository.findByEmailId(any())).thenReturn(Optional.ofNullable(userBooking));
//        assertEquals(List.of(),geoLocationServiceimpl.fetchDriverDetailsForMatchingPassenger("mysore","bangalore","punith@gmail.com"));
//        verify(userBookingRepository,times(1)).findByEmailId("punith@gmail.com");
//        verify(userBookingRepository,times(1)).findAll();
//    }
//
//}
