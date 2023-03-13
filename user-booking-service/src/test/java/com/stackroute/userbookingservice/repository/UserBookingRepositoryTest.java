package com.stackroute.userbookingservice.repository;


//
//import com.stackroute.userbookingservice.domain.UserBooking;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import java.util.Optional;
//
//@ExtendWith(SpringExtension.class)
//@DataMongoTest
//public class UserBookingRepositoryTest {
//    UserBooking userBooking1,userBooking2,userBooking3,userBooking4;
//    @Autowired
//    private UserBookingRepository userBookingRepository;
//
//    @BeforeEach
//    public  void SetUp(){
//        userBooking1=new UserBooking(1,"punith@gmail.com","Mysore","Bangalore",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",50.0);
//        userBooking2=new UserBooking(2,"kumar@gmail.com","Delhi","Pune",450.0,3,"Sedan","Passenger",true,"22-01-2005","11:30",150.0);
//        userBooking3=new UserBooking(3,"alan@gmail.com","whitefield","BMR Layout",84.1,1,"HatchBAck","Driver",false,"22-01-2005","11:30",280.);
//        userBooking4=new UserBooking(4,"michael@gmail.com","Mangalore","Bangalore",346.8,4,"SUV","Driver",false,"22-01-2005","11:30",456.0);
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
//    public void testUserBookingDetailsSavedOrNot(){
//        userBookingRepository.save(userBooking1);
//        Optional<UserBooking> user=userBookingRepository.findByEmailId(userBooking1.getEmailId());
//        Assertions.assertNotNull(user);
//        Assertions.assertEquals(userBooking1.getEmailId(),user.get().getEmailId());
//    }
//    @Test
//    public void testUserBookingDetailsSavedOrNotNegativeTest(){
//        userBookingRepository.save(userBooking1);
//        Optional<UserBooking> user=userBookingRepository.findByEmailId(userBooking1.getEmailId());
//        Assertions.assertNotNull(user);
//        Assertions.assertNotEquals("test@gmail.com",user.get().getEmailId());
//    }
//
//    @Test
//    public void testDeletingFirstRecord() {
//        userBookingRepository.save(userBooking1);
//        userBookingRepository.save(userBooking2);
//        userBookingRepository.deleteByEmailId(userBooking1.getEmailId());
//        Assertions.assertEquals(1, userBookingRepository.findAll().size());
//    }
//
//    @Test
//    public void testNegativeDeletingFirstRecord() {
//        userBookingRepository.save(userBooking1);
//        userBookingRepository.save(userBooking2);
//        userBookingRepository.deleteByEmailId(userBooking1.getEmailId());
//        Assertions.assertEquals(1, userBookingRepository.findAll().size());
//    }
//
//    @Test
//    public void testUpdatingUserDetails() {
//        userBookingRepository.save(userBooking1);
//        userBookingRepository.save(new UserBooking(1,"punith@gmail.com","madikeri","kashmir",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",58.0));
//        UserBooking user = userBookingRepository.findByEmailId("punith@gmail.com").get();
//        Assertions.assertEquals("MADIKERI", user.getFromPlace().toUpperCase());
//        Assertions.assertEquals("KASHMIR", user.getToPlace().toUpperCase());
//    }
//
//    @Test
//    public void testNegativeUpdatingUserDetails() {
//        userBookingRepository.save(userBooking1);
//        userBookingRepository.save(new UserBooking(1,"punith@gmail.com","madikeri","Bangalore",230.0,2,"SUV","Passenger",false,"22-01-2005","11:30",278.0));
//        UserBooking user = userBookingRepository.findByEmailId("punith@gmail.com").get();
//        Assertions.assertNotEquals("MYSORE", user.getFromPlace().toUpperCase());
//        Assertions.assertNotEquals("KASHMIR", user.getToPlace().toUpperCase());
//    }
//
//    @Test
//    public void testToFindByEmail(){
//        userBookingRepository.save(userBooking3);
//        Assertions.assertEquals("alan@gmail.com",userBooking3.getEmailId());
//    }
//
//
//
//
//}
