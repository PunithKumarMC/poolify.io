//package com.stackroute.userbookingservice.service;
//
//import com.stackroute.userbookingservice.domain.UserBooking;
//import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
//import com.stackroute.userbookingservice.repository.UserBookingRepository;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
//import org.springframework.test.util.ReflectionTestUtils;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import java.util.ArrayList;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//
//@ExtendWith(MockitoExtension.class)
//public class UserBookingServiceTest {
//    @Mock
//    private UserBookingRepository userBookingRepository;
//    @Mock
//    private SequenceGeneratorService sequenceGeneratorService;
//    @InjectMocks
//    private UserBookingServiceImpl userBookingServiceimpl;
//    UserBooking userBooking1,userBooking2,userBooking3,userBooking4;
//
//    @BeforeEach
//    public  void SetUp(){
//        userBooking1=new UserBooking(1,"punith@gmail.com","Mysore","Bangalore",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",50.0);
//        userBooking2=new UserBooking(2,"kumar@gmail.com","Delhi","Pune",450.0,3,"Sedan","Passenger",true,"22-01-2005","11:30",258.0);
//        userBooking3=new UserBooking(3,"alan@gmail.com","whitefield","BMR Layout",84.1,1,"HatchBAck","Driver",false,"22-01-2005","11:30",48.0);
//        userBooking4=new UserBooking(4,"michael@gmail.com","Mangalore","Bangalore",346.8,4,"SUV","Driver",false,"22-01-2005","11:30",540.0);
//        sequenceGeneratorService.getSequenceNumber("z");
//    }
//    @AfterEach
//    public void tearDown(){
//        userBooking1=null;
//        userBooking2=null;
//        userBooking3=null;
//        userBooking4=null;
//    }
//
//    @Test
//    public void saveUserBookingDetails() throws UserDoesNotExistException {
//       when(userBookingRepository.save(any())).thenReturn(userBooking1);
//       assertEquals(userBooking1,userBookingServiceimpl.addBookingDetails(userBooking1));
//       verify(userBookingRepository,times(1)).save(any());   //just to verify how many times it is called
////       verify(userBookingRepository,times(1)).findByEmailId(any());
//    }
//    @Test
//    public void updateUserBookingDetails() throws UserDoesNotExistException {
//        when(userBookingRepository.findByEmailId(userBooking1.getEmailId())).thenReturn(Optional.ofNullable(userBooking1));
//        when(userBookingRepository.save(userBooking1)).thenReturn(userBooking1);
//        assertEquals(userBooking1,userBookingServiceimpl.updateBookingDetails(userBooking1));
//        verify(userBookingRepository,times(1)).save(userBooking1);
//        verify(userBookingRepository,times(1)).findByEmailId(userBooking1.getEmailId());
//    }
//
//   @Test
//    public void getDetailsOfUser() throws UserDoesNotExistException {
//         when(userBookingRepository.findById(userBooking1.getBookingId())).thenReturn(Optional.ofNullable(userBooking1));
//        when(userBookingRepository.findByEmailId(userBooking1.getEmailId())).thenReturn(Optional.ofNullable(userBooking1));
//        assertEquals(Optional.ofNullable(userBooking1),userBookingServiceimpl.getBookingDetailsOfUser(userBooking1.getEmailId()));
//        verify(userBookingRepository,times(1)).findByEmailId(userBooking1.getEmailId());
//   }
//
//   @Test
//    public void getDetailsOfUserNegative() throws UserDoesNotExistException {
//
//       when(userBookingRepository.findByEmailId(userBooking1.getEmailId())).thenReturn(Optional.ofNullable(null));
//       assertThrows(UserDoesNotExistException.class,()->userBookingServiceimpl.getBookingDetailsOfUser(userBooking1.getEmailId()));
//       verify(userBookingRepository,times(1)).findByEmailId(userBooking1.getEmailId());
//   }
//
//   @Test
//    public void getUserBookingDetailsSize(){
//        when(userBookingRepository.findAll()).thenReturn(new ArrayList<>());
//        assertEquals(0,userBookingServiceimpl.getAllBookingDetails().size());
//        verify(userBookingRepository,times(1)).findAll();
//   }
//
//}
