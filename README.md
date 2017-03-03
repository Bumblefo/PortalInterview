# PortalInterview

#list of files:
Task 1:
	- index.html
	- style.css
	- main.js
Task 2:
	- alg.js


Data structures created:
EventTime
	- represents a single date and time
Event
	- represent an event w/ title, start date, end time
Calendar
	- object that manages events to be added an reports on collisions
	
Explanation:
	Event objects are created using title, start and end dates and appended to an array in Calendar
	Calendar checks for collisions by looping through the array of events for each event i
		for each event i it checks all later events j to determine if events i and j collide
			if they do collide they are added to the Set 'conflicts' and returned
	
	Collisions are checked by:
		If the end time of event i is before event j's start time or event i's start time is after event j's end time then no collision is found
		Otherwise: report collision by adding to 'conflicts' Set
	
Possible edge cases:
	- considered events w/ start and end times that occurred on 2 different dates
		solved by representing event w/ 2 separate times rather than a singular date w/ 2 different times of days
	- considered invalid events, i.e. start times that were after their end times:
		solved by making a check before adding to the events array
	- assumed that it is valid for an event start time to be at the exact same time as an event end time
		if this is not valid then can simply make some changes to the Calendar collides function to check strictly less than or greater than