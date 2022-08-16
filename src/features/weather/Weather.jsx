import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { weatherAPI } from "./weatherAPI";
import moment from "moment";
import Forecast from "./forecast/Forecast.component";
import Current from "./current/Current.component";
import DatePicker from "./datepicker";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sports from "./sports/Sports.component";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import classes from "./weather.module.css";
import { selectSettings } from "../profile/settingsSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const Weather = () => {
  const settings = useSelector(selectSettings);
  let [searchParams, setSearchParams] = useSearchParams();
  let [cityName, setCityName] = useState(searchParams.get("cityName"));
  let [forecastDate, setForecastDate] = useState(
    searchParams.get("forecastDate") || moment().format("YYYY-MM-DD")
  );
  const { t } = useTranslation(["weather", "app"]);
  const {
    data: cityData,
    isLoading,
    error,
  } = weatherAPI.useFetchForecastQuery(
    { cityName, forecastDate },
    {
      skip: forecastDate ? false : true,
    }
  );

  let [historyDate, setHistoryDate] = useState(
    searchParams.get("historyDate") || false
  );
  const {
    data: historyWeatherData,
    isLoading: historyIsLoading,
    error: historyError,
  } = weatherAPI.useFetchHistoryQuery(
    { cityName, historyDate },
    {
      skip: historyDate ? false : true,
    }
  );

  let [renderWeatherData, setRenderWeatherData] = useState(false);
  useEffect(() => {
    if (cityData) {
      setRenderWeatherData(cityData);
    }
  }, [cityData]);
  useEffect(() => {
    if (historyWeatherData) {
      setRenderWeatherData(historyWeatherData);
    }
  }, [historyWeatherData]);

  let [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    if (selectedDate && selectedDate.isBefore(moment(), "day")) {
      setHistoryDate(selectedDate.format("YYYY-MM-DD"));
    } else if (selectedDate) {
      setForecastDate(selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  return (
    <>
      {(isLoading || historyIsLoading) && (
        <div>{t("loading", { ns: "app" })}</div>
      )}
      {(error || historyError) && (
        <Container>
          {t("cityErrorLoading", { ns: "app" })}
          <Link href="/">
            <Button color="primary" fontWeight="bold">
              {t("toMain", { ns: "app" })}
            </Button>
          </Link>
        </Container>
      )}
      {renderWeatherData && (
        // <Container maxWidth="xl">
        <Container component="div" maxWidth="xl">
          <Typography
            variant="h4"
            component="h4"
            color="primary"
            textAlign="center"
            marginRight="55%"
            marginLeft="30%"
          >
            {renderWeatherData.location.name}
          </Typography>
          <div className={classes.wrap}>
            <div className={classes.currentContainer}>
              <Current
                weatherData={renderWeatherData.forecast.forecastday[0]}
                currentWeatherData={cityData.current}
                settings={settings}
              />
            </div>
            <div className={classes.forecastContainer}>
              <DatePicker selectDate={setSelectedDate} />
              <Box
                sx={{
                  mt: 4,
                }}
              >
                <Forecast
                  selectDay={setSelectedDate}
                  selectedDay={moment(selectedDate).format("YYYY-MM-DD")}
                  cityName={cityName}
                  settings={settings}
                />
              </Box>
            </div>
          </div>
          <Sports cityName={cityName} />
        </Container>
        // </Container>
      )}
    </>
  );
};
