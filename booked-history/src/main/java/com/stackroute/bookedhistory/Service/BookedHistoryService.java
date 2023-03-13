package com.stackroute.bookedhistory.Service;

import com.stackroute.bookedhistory.domain.BookedHistory;


public interface BookedHistoryService {
	public BookedHistory getHistory(String emailId);

		BookedHistory saveHistory1(BookedHistory bookedHistory, String emailId);

		public BookedHistory saveRatings(BookedHistory bookedHistory,String emailId);
}
