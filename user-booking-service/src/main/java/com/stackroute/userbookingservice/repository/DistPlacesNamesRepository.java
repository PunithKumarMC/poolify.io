package com.stackroute.userbookingservice.repository;

import com.stackroute.userbookingservice.domain.DistResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DistPlacesNamesRepository extends MongoRepository<DistResponse,String> {
}
