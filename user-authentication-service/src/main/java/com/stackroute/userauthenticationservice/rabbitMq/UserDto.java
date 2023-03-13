package com.stackroute.userauthenticationservice.rabbitMq;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	String email;
	String password;
}
