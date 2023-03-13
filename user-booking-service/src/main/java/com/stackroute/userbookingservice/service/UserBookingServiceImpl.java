package com.stackroute.userbookingservice.service;

import com.stackroute.userbookingservice.domain.UserBooking;
import com.stackroute.userbookingservice.exception.UserDoesNotExistException;
import com.stackroute.userbookingservice.repository.UserBookingRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserBookingServiceImpl implements UserBookingService {
    private UserBookingRepository userBookingRepository;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    @Autowired
    public UserBookingServiceImpl(UserBookingRepository userBookingRepository) {
        this.userBookingRepository = userBookingRepository;
    }

    @Override
    public UserBooking addBookingDetails(UserBooking userBooking) throws UserDoesNotExistException {
//        userBooking.setBookingId(sequenceGeneratorService.getSequenceNumber(UserBooking.SEQUENCE_NAME));
        if (userBookingRepository.findByEmailId(userBooking.getEmailId()).isPresent()){
            throw new UserDoesNotExistException();
        }else{
            return userBookingRepository.save(userBooking);
        }
    }

    @Override
    public boolean deleteBookingDetails(String emailId) throws UserDoesNotExistException {
        boolean flag=false;
        Optional<UserBooking> userBooking1=userBookingRepository.findByEmailId(emailId);
        if (userBooking1.isPresent()) {
            userBookingRepository.deleteByEmailId(emailId);
            flag=true;
        } else {
            flag=false;
            throw new UserDoesNotExistException();
        }
        return flag;
    }

    @Override
    public UserBooking updateBookingDetails(UserBooking userBooking) throws UserDoesNotExistException {
        System.out.println(userBooking.getEmailId());
        Optional<UserBooking> userBooking1=userBookingRepository.findByEmailId(userBooking.getEmailId());
        if (userBooking1.isEmpty()) {
            throw new UserDoesNotExistException();
        } else {
            return userBookingRepository.save(userBooking);
        }
    }

    @Override
    public List<UserBooking> getAllBookingDetails() {
        return userBookingRepository.findAll();
    }
    @Override
    public Optional<UserBooking> getBookingDetailsOfUser(String emailId) throws UserDoesNotExistException {
        Optional<UserBooking> userBooking1=userBookingRepository.findByEmailId(emailId);
        if (userBooking1.isPresent()) {
            return userBookingRepository.findByEmailId(userBooking1.get().getEmailId());
        } else {
            throw new UserDoesNotExistException();
        }
    }

    @Override
    public UserBooking updateBookingSeats(int noOfSeats, String emailId) throws UserDoesNotExistException {
        Optional<UserBooking> user=userBookingRepository.findByEmailId(emailId);
        UserBooking u;
        if (user.isPresent()){
            System.out.println("within update seats");
            int seats=user.get().getNoOfSeatsRequired();
            int updateSeats=seats-noOfSeats;
            user.get().setNoOfSeatsRequired(updateSeats);
           u= userBookingRepository.save(user.get());
        }else{
            throw new UserDoesNotExistException();
        }

        return u;
    }

    @Override
    public UserBooking updateDatabaseOfUser(String emailId, String serviceType) {
        UserBooking user= userBookingRepository.findByEmailId(emailId).get();
        user.setServiceType(serviceType);
        UserBooking u= userBookingRepository.save(user);
        return u;
    }
}
