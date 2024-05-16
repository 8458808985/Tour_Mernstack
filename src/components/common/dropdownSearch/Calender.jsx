import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Calender() {
  const [dates, setDates] = useState([
    new DateObject().setDay(1),
    new DateObject().setDay(1).add(1, "month"),
  ]);
  return (
    <DatePicker
      inputClass="datetime-local"
    />
  );
}
