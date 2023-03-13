package com.stackroute.ridefinishednotification.Repository;

import com.stackroute.ridefinishednotification.Domain.RideFinished;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface RideFinishedRepository extends MongoRepository<RideFinished,String> {
}
