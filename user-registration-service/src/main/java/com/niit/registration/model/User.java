package com.niit.registration.model;

import lombok.*;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Document   //used to identify a domain object, which is persisted to MongoDB
@Data // Equivalent to @ToString , @EqualsAndHashCode , @Getter / @Setter and @RequiredArgsConstructor
@Setter
@Getter

public class User {


    @Id
    public String email;
    private String password;
    private personalDetails updateDetails;
    private ProfilePhoto profilePhoto;
//    personalDetails updateDetails;

}
