package com.niit.registration.model;

import lombok.*;

import javax.persistence.Lob;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class ProfilePhoto {
	private String imgName;
	private String type;
	private byte[] pic;
}
