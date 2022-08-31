// I AM THE DECLINER
// SHIT MEETING DECLINER

const USER_CAL = 'ADD YOUR EMAIL HERE'
const DECLINE_LEN = 50;  // Anything less than 30 characters will be rejected

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
    if (desc.length <= DECLINE_LEN && event.isOwnedByMe() == false && event.getMyStatus().toString() != CalendarApp.GuestStatus.NO) {
      event.setMyStatus(CalendarApp.GuestStatus.NO);
      event.deleteEvent();
    };
  };
}
