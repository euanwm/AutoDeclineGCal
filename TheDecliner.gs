// I AM THE DECLINER
// SHIT MEETING DECLINER

const USER_CAL = 'YOUR EMAIL HERE'
const DECLINE_LEN = 50;  // Anything less than 50 characters will be rejected

function FetchCal() {
  try {
    let today = new Date();
    let cal_boi = CalendarApp.getCalendarById(USER_CAL).getEventsForDay(today);
    check_events(cal_boi);
  } catch (e) {
    Logger.log('Something bork\'d: ' + e);
  }
}

function check_events(calendar_boi) {
  for (let i = 0; i < calendar_boi.length; i++) {
    let event = calendar_boi[i];
    let desc = event.getDescription();
    var exempt_meeting = check_event_organiser(event);

    if (desc.length <= DECLINE_LEN && event.isOwnedByMe() == false && event.getMyStatus().toString() != CalendarApp.GuestStatus.NO && exempt_meeting == false) {
      event.setMyStatus(CalendarApp.GuestStatus.NO);
      event.deleteEvent();
    };
  };
}

function check_event_organiser(gEvent) {
  const event_owners = gEvent.getCreators();
  for (let i = 0; i < event_owners.length; i++) {
    if (exemption_check(event_owners[i]) == true) {
      return true;
    };
  };
  return false;
}

function exemption_check(email) {
  const entry_list = ['hibob', 'neil'];  // If any email address contains these words then it's exempt from immediate deletion
  for (let i = 0; i < entry_list.length; i++) {
    if (email.includes(entry_list[i]) == true) {
      return true;
    };
  };
  return false;
}
