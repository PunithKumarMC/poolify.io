package com.stackroute.bookedhistory.repository;


import com.stackroute.bookedhistory.domain.BookedHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookedHistoryRepo extends MongoRepository<BookedHistory,String> {
	BookedHistory findByEmailId(String emailId);


}
