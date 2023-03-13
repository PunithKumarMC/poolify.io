package com.stackroute.userbookingservice.repository;

import com.stackroute.userbookingservice.domain.AllPlaces;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GeoLocationRepository extends MongoRepository<AllPlaces,String> {
}
