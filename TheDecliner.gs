// I AM THE DECLINER
// SHIT MEETING DECLINER

const USER_CAL = 'person@email.com'
const DECLINE_LEN = 50;  // Anything less than 50 characters will be rejected

function FetchCal() {
  try {
    let today = new Date();
    let twoWeek = new Date(Date.now() + (6.048e+8 * 2));
    let cal_boi = CalendarApp.getCalendarById(USER_CAL).getEvents(today, twoWeek);
    Logger.log(cal_boi.length)
    CheckEvents(cal_boi);
  } catch (e) {
    Logger.log('Something bork\'d: ' + e);
  }
}

function CheckEvents(calendar_boi) {
  for (let i = 0; i < calendar_boi.length; i++) {
    let event = calendar_boi[i];
    let desc = event.getDescription();
    var exempt_meeting = CheckEventOrganiser(event);

    if (desc.length <= DECLINE_LEN && event.isOwnedByMe() == false && event.getMyStatus().toString() != CalendarApp.GuestStatus.YES && exempt_meeting == false) {
      event.setMyStatus(CalendarApp.GuestStatus.NO);
      // I'll add this back in once I can send auto-replies
      // event.deleteEvent();
    };
  };
}

function CheckEventOrganiser(gEvent) {
  // if multiple creators are holding the event then we check them against the exemption list
  const event_owners = gEvent.getCreators();
  for (let i = 0; i < event_owners.length; i++) {
    if (ExemptionCheck(event_owners[i]) == true) {
      return true;
    };
  };
  return false;
}

function ExemptionCheck(email) {
  // checks if an email contains an exemption keyword
  const entry_list = ['hibob', 'neil'];  // If any email address contains these words then it's exempt from immediate deletion
  for (let i = 0; i < entry_list.length; i++) {
    if (email.includes(entry_list[i]) == true) {
      return true;
    };
  };
  return false;
}