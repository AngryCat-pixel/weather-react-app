import TextField from "@mui/material/TextField";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React from "react";
export default function DatePicker({ selectDate, selectedDate }) {
  const [value, setValue] = React.useState(moment(selectedDate));
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MUIDatePicker
        label="Выберите дату"
        minDate={moment().subtract(7, "days")}
        maxDate={moment().add(10, "day")}
        disableHighlightToday
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          selectDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
