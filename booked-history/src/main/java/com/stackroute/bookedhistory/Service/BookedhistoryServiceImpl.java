package com.stackroute.bookedhistory.Service;

import com.stackroute.bookedhistory.domain.BookedHistory;
import com.stackroute.bookedhistory.repository.BookedHistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookedhistoryServiceImpl implements BookedHistoryService {

    private final BookedHistoryRepo bookedHistoryRepo;

    @Autowired
    public BookedhistoryServiceImpl(BookedHistoryRepo bookedHistoryRepo) {
        this.bookedHistoryRepo = bookedHistoryRepo;
    }


    @Override
    public BookedHistory getHistory(String emailId) {
        return bookedHistoryRepo.findByEmailId(emailId);
    }

    @Override
    public BookedHistory saveHistory1(BookedHistory bookedHistory, String emailId) {

        BookedHistory bookedHistory1 = bookedHistoryRepo.findByEmailId(emailId);
        System.out.println(bookedHistory1);

        if (bookedHistory1 == null) {
            return bookedHistoryRepo.save(bookedHistory);
        } else {
            bookedHistory1.getFromPlace().add(bookedHistory.getFromPlace().get(0));
            bookedHistory1.getToPlace().add(bookedHistory.getToPlace().get(0));
            bookedHistory1.getVehicleType().add(bookedHistory.getVehicleType().get(0));
            bookedHistory1.getVehNumber().add(bookedHistory.getVehNumber().get(0));
            bookedHistory1.getEstimatedPrice().add(bookedHistory.getEstimatedPrice().get(0));
            bookedHistory1.getPaymentMedium().add(bookedHistory.getPaymentMedium().get(0));
            System.out.println("saved");
            return bookedHistoryRepo.save(bookedHistory1);

        }


    }

    @Override
    public BookedHistory saveRatings(BookedHistory bookedHistory, String emailId) {
        BookedHistory bookedHistory1 = bookedHistoryRepo.findByEmailId(emailId);
        System.out.println(bookedHistory1);

        if (bookedHistory1 == null) {
            return bookedHistoryRepo.save(bookedHistory);
        } else {
            if (bookedHistory1.getRating() == null) {
                bookedHistory1.setRating(bookedHistory.getRating());
                System.out.println("print " + bookedHistory1.getRating());
            } else {
                bookedHistory1.getRating().add(bookedHistory.getRating().get(0));
                System.out.println("ratings saved");

            }
			return bookedHistoryRepo.save(bookedHistory1);
        }

	}


}

