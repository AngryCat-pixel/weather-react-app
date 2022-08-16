import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
export default function DatePicker({ selectDate }) {
  const [value, setValue] = React.useState(null);
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
