import {
  differenceInCalendarYears,
  differenceInWeeks,
  format,
  getDay,
  isToday,
  isYesterday,
} from "date-fns";
import locale from "date-fns/locale/ru";

export const formatDateInMessageListView = (date) => {
  if (isToday(date)) {
    return "Сегодня";
  }
  if (isYesterday(date)) {
    return "Вчера";
  }
  if (differenceInWeeks(date, Date.now()) === 0) {
    if (getDay(date) !== getDay(Date.now())) {
      const weekDay = format(date, "EEEE", { locale });
      return weekDay[0].toUpperCase() + weekDay.slice(1);
    }
  }
  if (differenceInCalendarYears(date, Date.now()) === 0) {
    return format(date, "d MMMM", { locale });
  }
  return format(date, "d MMMM, yyyy", { locale });
};

export const formatDateInChatListView = (date) => {
  if (isToday(date)) {
    return format(date, "HH:mm", { locale });
  }
  if (differenceInWeeks(date, Date.now()) === 0) {
    if (getDay(date) !== getDay(Date.now())) {
      const weekDay = format(date, "EEEEEE", { locale });
      return weekDay[0].toUpperCase() + weekDay.slice(1);
    }
  }
  if (differenceInCalendarYears(date, Date.now()) === 0) {
    return format(date, "d MMM", { locale });
  }
  return format(date, "d MMM, yyyy", { locale });
};

export const formatDateInMessageView = (date) => {
  return format(date, "HH:mm", { locale });
};
