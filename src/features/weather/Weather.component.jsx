import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addCity, removeCity, selectFavorites } from "../home/favoritesSlice";
import { useSyncFavorites } from "../home/utils";
import { selectSettings } from "../profile/settingsSlice";
import Current from "./current/Current.component";
import DatePicker from "./datepicker";
import Forecast from "./forecast/Forecast.component";
import Sports from "./sports/Sports.component";
import classes from "./weather.module.css";
import { weatherAPI } from "./weatherAPI";

const Weather = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const favorites = useSelector(selectFavorites);
  useSyncFavorites(favorites);
  let [searchParams, setSearchParams] = useSearchParams();

  let [cityName, setCityName] = useState(searchParams.get("cityName"));
  useEffect(() => {
    setCityName(searchParams.get("cityName"));
  }, [searchParams]);
  useEffect(() => {
    setCityName(searchParams.get("cityName"));
    if (searchParams.get("forecastDate")) {
      setSelectedDate(moment(searchParams.get("forecastDate")));
    } else if (searchParams.get("historyDate")) {
      setSelectedDate(moment(searchParams.get("historyDate")));
    } else {
      setSelectedDate(moment());
    }
    // eslint-disable-next-line
  }, []);
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
    if (cityData && !selectedDate.isBefore(moment(), "day")) {
      setRenderWeatherData(cityData);
    }
    // eslint-disable-next-line
  }, [cityData]);
  useEffect(() => {
    if (historyWeatherData && selectedDate.isBefore(moment(), "day")) {
      setRenderWeatherData(historyWeatherData);
    }
    // eslint-disable-next-line
  }, [historyWeatherData]);

  let [selectedDate, setSelectedDate] = useState(moment());
  useEffect(() => {
    if (selectedDate && selectedDate.isBefore(moment(), "day")) {
      let formatSelectedDate = selectedDate.format("YYYY-MM-DD");
      if (formatSelectedDate === historyDate) {
        setRenderWeatherData(historyWeatherData);
      }
      setHistoryDate(formatSelectedDate);
      searchParams.set("historyDate", formatSelectedDate);
      searchParams.delete("forecastDate");
    } else if (selectedDate) {
      let formatSelectedDate = selectedDate.format("YYYY-MM-DD");
      if (formatSelectedDate === forecastDate) {
        setRenderWeatherData(cityData);
      }
      setForecastDate(formatSelectedDate);
      searchParams.set("forecastDate", formatSelectedDate);
      searchParams.delete("historyDate");
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line
  }, [selectedDate]);

  const toggleFavoriteCity = () => {
    if (favorites.cities.includes(cityName)) {
      dispatch(removeCity(cityName));
    } else {
      dispatch(addCity(cityName));
    }
  };

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
        <Container
          component="div"
          maxWidth="xl"
          sx={{
            pt: 2,
          }}
        >
          <CssBaseline />
          <Typography
            variant="h4"
            component="h4"
            color="primary"
            textAlign="center"
            marginRight="55%"
            marginLeft="30%"
          >
            {renderWeatherData.location.name}
            <IconButton size="large" onClick={toggleFavoriteCity}>
              {favorites.cities.includes(cityName) ? (
                <Favorite />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          </Typography>
          <div className={classes.wrap}>
            <div className={classes.currentContainer}>
              {renderWeatherData && (
                <Current
                  settings={settings}
                  cityName={cityName}
                  forecastWeatherData={renderWeatherData}
                />
              )}
            </div>
            <div className={classes.forecastContainer}>
              <DatePicker
                selectDate={setSelectedDate}
                selectedDate={selectedDate}
              />
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
      )}
    </>
  );
};

export default Weather;
