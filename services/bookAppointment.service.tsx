import StorageService from "core-module/services/storage.service";
import dayjs from "dayjs";
import api from "core-module/services/api";
import isBetween from "dayjs/plugin/isBetween";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { store } from "core-module/reducers/store";
import { setBookAppointmentProps } from "core-module/actions/layout/layout";

dayjs.extend(isBetween);

let FETCHED_TIMESLOTS_DATA: any = {};

const GROUPING_RULES: any = {
  morning: {
    transId: "Morning",
    label: "Morning",
    start: "00:01",
    end: "11:55",
  },
  earlyAfternoon: {
    transId: "Early afternoon",
    label: "Early afternoon",
    start: "12:00",
    end: "14:55",
  },
  lateAfternoon: {
    transId: "Late afternoon",
    label: "Late afternoon",
    start: "15:00",
    end: "17:55",
  },
  evening: {
    transId: "Evening",
    label: "Evening",
    start: "18:00",
    end: "23:55",
  },
};

let SELECTED_DATE = null;

export let litePicker = null;

const handleBookAppointmentEvent = (event: any) => {
  const id = StorageService.getDataByKey("merchantData")?.productId;
  store.dispatch(setBookAppointmentProps(id, event));
};

const fetchData = async (startDay: any, endDay: any, daysBetween: any) => {
  const merchantData = StorageService.getDataByKey("merchantData");
  let data = new Array<object>();
  for (let i = 0; i <= daysBetween - 1; i++) {
    let timestamp = startDay.add(i, "day").format("YYYY-MM-DD");
    const timeSlotId = `${timestamp}.${merchantData.merchantNumber}.${merchantData.productId}`;
    if (!(timeSlotId in FETCHED_TIMESLOTS_DATA)) {
      let response = await api.get(
        merchantData?.productId && merchantData.hasCalendarItems
          ? `/core/public/timeslot/merchant/${merchantData.merchantNumber}/day/${timestamp}?product_id=${merchantData.productId}`
          : `/core/public/timeslot/merchant/${merchantData.merchantNumber}/day/${timestamp}`
      );
      const updatedData = updateData(response.data, timestamp);
      FETCHED_TIMESLOTS_DATA[timeSlotId] = updatedData;
      data.push(updatedData);
    } else {
      data.push(FETCHED_TIMESLOTS_DATA[timeSlotId]);
    }
  }
  return groupByDate(data.flat(), startDay, endDay);
};

export const selectDate = (date: any) => {
  SELECTED_DATE = date;
};

export const setLitePicker = (picker: any) => {
  litePicker = picker;
};

const groupByDate = (data: any, start, end) => {
  let groupedTimeslots: Object = {};
  let returnTimeslots: any = [];

  for (let timeslot of data) {
    const timeslotStart = dayjs(timeslot.start);
    const dayToFetch = timeslotStart.format("YYYY-MM-DD");

    Object.keys(GROUPING_RULES).forEach((key) => {
      const rule = GROUPING_RULES[key];

      const ruleStart = dayjs(dayToFetch + " " + rule.start);
      const ruleEnd = dayjs(dayToFetch + " " + rule.end);

      if (timeslotStart.isBetween(ruleStart, ruleEnd, null, "[]")) {
        if (!groupedTimeslots.hasOwnProperty(key)) {
          groupedTimeslots[key] = {};
        }

        if (!groupedTimeslots[key].hasOwnProperty(dayToFetch)) {
          groupedTimeslots[key][dayToFetch] = [];
        }

        groupedTimeslots[key][dayToFetch].push(timeslot);
      }

      if (timeslot.nonInteractable === true) {
        if (!groupedTimeslots.hasOwnProperty(key)) {
          groupedTimeslots[key] = {};
        }

        if (!groupedTimeslots[key].hasOwnProperty(dayToFetch)) {
          groupedTimeslots[key][dayToFetch] = [];
        }

        groupedTimeslots[key][dayToFetch].push(timeslot);
      }
    });
  }

  Object.keys(groupedTimeslots).forEach((key) => {
    const group = groupedTimeslots[key];
    const rule = GROUPING_RULES[key];

    const cStart = dayjs(start.format("YYYY-MM-DD") + " " + rule.start);
    const cEnd = dayjs(start.format("YYYY-MM-DD") + " " + rule.end);

    returnTimeslots.push({
      title: rule.label,
      start: cStart.toDate(),
      end: cEnd.toDate(),
      groupedEvents: group,
    });
  });

  if (litePicker) {
    let highlightedDays = [];

    for (const timeslot of returnTimeslots.flat()) {
      for (const [key] of Object.entries(timeslot.groupedEvents)) {
        highlightedDays.push(dayjs(key).toDate());
      }
    }
    litePicker.setHighlightedDays(highlightedDays);
  }

  return returnTimeslots.flat().map((timeslot: any) => timeslot);
};

const updateData = (response, day) => {
  let updatedData = null;

  if (!response) {
    const d = dayjs(day);
    updatedData = [
      {
        start: d.toDate(),
        classNames: ["empty-date-event"],
        title: "No visits available",
        nonInteractable: true,
      },
    ];
  } else {
    updatedData = response.map((el) => {
      const start = dayjs(el.start);
      el.id = window.btoa(start.format());
      el.title = start.format("HH:mm");
      return el;
    });
  }
  return updatedData;
};

export const RenderEventContent = (eventInfo: any) => {
  const now = dayjs();
  const eventStart = dayjs(eventInfo.event.start);
  const eventEnd = dayjs(eventInfo.event.end);
  let defaultOpen = "";

  if (now.isBetween(eventStart, eventEnd)) {
    defaultOpen = "open";
  }

  let innerAccordionDOM = [];
  for (let timestamp in eventInfo.event.extendedProps.groupedEvents) {
    let day = eventInfo.event.extendedProps.groupedEvents[timestamp];

    if (SELECTED_DATE) {
      let sDate = dayjs(SELECTED_DATE.dateInstance);
      let tDate = dayjs(timestamp);

      if (!sDate.isSame(tDate, "day")) {
        continue;
      }
    }

    const events = day.map((event: any) => {
      return (
        <div
          className={"ec-event " + (event.nonInteractable === true ? "ec-event--disabled" : "")}
          onClick={() => handleBookAppointmentEvent(event)}
        >
          {event.title}
        </div>
      );
    });

    innerAccordionDOM.push(
      <div className="event-accordion__day">
        <div className="day__header">{dayjs(timestamp).format("dddd, MMM DD")}</div>
        <div className="day__events">{events}</div>
      </div>
    );
  }

  return (
    <div className={`event-accordion ${defaultOpen}`}>
      <div
        className="event-accordion__header"
        onClick={(e) => {
          e.stopPropagation();
          const target = e.currentTarget;
          (target.parentNode as HTMLInputElement).classList.toggle("open");
        }}
      >
        <div className="header-text">{eventInfo.event.title}</div>
        <div className="header-icon">
          <FontAwesomeIcon icon={faChevronDown} />
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
      <div className="event-accordion__inner">{innerAccordionDOM.map((el) => el)}</div>
    </div>
  );
};

export const FullCalendarOption: any = {
  initialView: "listWeek",
  views: {
    listTwoMonths: {
      type: "list",
      duration: { months: 2 },
      buttonText: "4 day",
    },
  },
  validRange: (nowDate) => ({
    start: nowDate,
    end: dayjs(nowDate).add(2, "weeks").toDate(),
  }),
  headerToolbar: {
    start: "prev",
    center: "title",
    end: "next",
  },
  listDayFormat: {
    month: "short",
    day: "numeric",
    weekday: "long",
  },
  height: "auto",
  eventDisplay: "block",
  listDaySideFormat: false,
  eventContent: RenderEventContent,
  events: (info, failureCallback) => {
    try {
      const startDay = dayjs(info.start);
      const endDay = dayjs(info.end);
      const daysBetween = endDay.diff(startDay, "day");
      return fetchData(startDay, endDay, daysBetween);
    } catch {
      return failureCallback({ message: "Error occured, please try again." });
    }
  },
};
