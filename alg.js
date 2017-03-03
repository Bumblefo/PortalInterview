function EventTime(day, month, year, hour, minute) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.hour = hour; // 24-hour representation
    this.minute = minute;

    //equal
    this.eq = function(other) {
        return this.year === other.year && this.month === other.month && this.day === other.day && this.hour === other.hour && this.minute === other.minute;
    }

    //greater than
    this.gt = function(other) {
        if (this.year === other.year) {
            if (this.month === other.month) {
                if (this.day === other.day) {
                    if (this.hour === other.hour) {
                        if (this.minute === other.minute) {
                            return false;
                        } else if (this.minute > other.minute) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (this.hour > other.hour) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (this.day > other.day) {
                    return true;
                } else {
                    return false;
                }
            } else if (this.month > other.month) {
                return true;
            } else {
                return false;
            }
        } else if (this.year > other.year) {
            return true;
        } else {
            return false;
        }
    }

    this.gte = function(other) {
        return this.gt(other) || this.eq(other);
    }

    // less than
    this.lt = function(other) {
        return other.gt(this) || other.eq(this);
    }

    this.lte = function(other) {
        return other.gt(this);
    }
}

function Event(title, startEventTime, endEventTime) {
    this.title = title;
    this.start = startEventTime;
    this.end = endEventTime;

    this.collides = function(otherEvent) {
        return !(this.end.lte(otherEvent.start) || this.start.gte(otherEvent.end));
    }
}

function Calendar() {
    this.events = [];

    this.addEvent = function(title, eventStart, eventEnd) {
        if (eventStart.lte(eventEnd)) { // add the event only if valid start and end times
            this.events.push(new Event(title, eventStart, eventEnd));
        }
    }

    this.getConflicts = function () {
        var conflicts = new Set();

        for (var i = 0; i < this.events.length; i++) {
            for (var j = i + 1; j < this.events.length; j++) {
                if (this.events[i].collides(this.events[j])) {
                    conflicts.add(this.events[i]);
                    conflicts.add(this.events[j]);
                }
            }
        }

        return conflicts;
    }
}

/*
    This assumes all events are valid, i.e. start time is <= end time
 */

var main = function() {
    var calendar = new Calendar();

    // Test event data set
    calendar.addEvent("Interview at The Portal", new EventTime(23, 2, 2017, 15, 0), new EventTime(23, 2, 2017, 16, 30));
    calendar.addEvent('"Lunch with Cindy"', new EventTime(25, 2, 2017, 12, 0), new EventTime(25, 2, 2017, 13, 0));
    calendar.addEvent("Dinner with John", new EventTime(24, 2, 2017, 17, 0), new EventTime(24, 2, 2017, 17, 30)); // should conflict w/ below
    calendar.addEvent("Conference", new EventTime(24, 2, 2017, 11, 0), new EventTime(24, 2, 2017, 17, 30));

    // 4 more events (at least 2 must overlap)
    calendar.addEvent("Class 1", new EventTime(1, 5, 2017, 12, 0), new EventTime(1, 5, 2017, 13, 0)) // 12pm-1pm
    calendar.addEvent("Class 2", new EventTime(1, 5, 2017, 12, 30), new EventTime(1, 5, 2017, 14, 0)); // 12:30pm-2pm
    calendar.addEvent("Class 3", new EventTime(1, 5, 2017, 13, 0), new EventTime(1, 5, 2017, 15, 0)); // 1pm-3pm
    calendar.addEvent("Class 4", new EventTime(8, 8, 2017, 23, 0), new EventTime(8, 9, 2017, 1, 0)); // 11pm-1am

    console.log(calendar.getConflicts());
}

main();