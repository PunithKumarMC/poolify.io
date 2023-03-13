package com.stackroute.bookedhistory.controller;


import com.stackroute.bookedhistory.Service.BookedHistoryService;
import com.stackroute.bookedhistory.domain.BookedHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v2/")
//@CrossOrigin
public class Controller {
	private BookedHistoryService bookedHistoryService;
	private ResponseEntity responseEntity;

	@Autowired

	public Controller(BookedHistoryService bookedHistoryService) {
		this.bookedHistoryService = bookedHistoryService;
	}

//	@PostMapping("/saveHistory")
//	public ResponseEntity<?> saveHistory(@RequestBody BookedHistory bookedHistory) {
//		//Thread.sleep(120000);
//		System.out.println("created");
//		bookedHistoryService.saveHistory1(bookedHistory);
//		return responseEntity = new ResponseEntity("User Created", HttpStatus.CREATED);
//	}


	@GetMapping("/getUserBookedHistory/{emailId}")
	public ResponseEntity<?> getHistory(@PathVariable("emailId") String emailId) {

		responseEntity = new ResponseEntity(bookedHistoryService.getHistory(emailId), HttpStatus.OK);

		return responseEntity;


	}

	@PostMapping("/addHistory/{emailId}")
	public ResponseEntity<?> addHistory(@RequestBody BookedHistory bookedHistory, @PathVariable String emailId) {
		return new ResponseEntity<>(bookedHistoryService.saveHistory1(bookedHistory, emailId), HttpStatus.CREATED);
	}

	@PostMapping("/addRating/{emailId}")
	public ResponseEntity<?> addRating(@RequestBody BookedHistory bookedHistory, @PathVariable String emailId) {
		return new ResponseEntity<>(bookedHistoryService.saveRatings(bookedHistory, emailId), HttpStatus.CREATED);
	}

}

