import React from "react";
import { weatherAPI } from "./weatherAPI";
import moment from "moment";

const Forecast = ({ selectDay, selectedDay, cityName }) => {
  const {
    data: cityData,
    isLoading,
    error,
  } = weatherAPI.useFetchForecastQuery({ cityName, forecastDate: false });
  return (
    <div>
      {cityData &&
        cityData.forecast.forecastday.map((day, index) => (
          <div
            key={day.date_epoch}
            onClick={() => selectDay(moment(day.date))}
            style={
              selectedDay === day.date ? { backgroundColor: "#e3e3e3" } : {}
            }
          >
            <div>{day.date}</div>
            <div>Средняя температура: {day.day.avgtemp_c}</div>
            <div>
              Иконка текущей погоды: <img src={day.day.condition.icon} />
            </div>
            <div>Общее сотояние погоды: {day.day.condition.text}</div>
          </div>
        ))}
    </div>
  );
};

export default Forecast;
