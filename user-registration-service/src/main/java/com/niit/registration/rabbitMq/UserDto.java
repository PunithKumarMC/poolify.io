package com.niit.registration.rabbitMq;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
	String email;
	String password;
}
