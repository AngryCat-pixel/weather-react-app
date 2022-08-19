import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHorizontalScroll } from "../../../hooks/useHorizontalScroll";
import classes from "./current.module.css";
import cloudyImg from "./img/cloud.png";
import dropImg from "./img/drop.png";
import rainyImg from "./img/rainy.png";
import snowImg from "./img/snow.png";
import temperaturesImg from "./img/temperatures.png";
import windImg from "./img/wind.png";
import windDirectionImg from "./img/windDirection.png";
import windDirectionDarkImg from "./img/windDirectionDark.png";
import { weatherAPI } from "../weatherAPI";

const Current = ({ cityName, settings, forecastWeatherData }) => {
  const { t } = useTranslation("weather");
  const theme = useTheme();
  const scrollRef = useHorizontalScroll();
  const {
    data: currentWeatherData,
    isLoading: currentWeatherDataIsLoading,
    error: currentWeatherDataError,
  } = weatherAPI.useFetchForecastQuery({ cityName, forecastDate: false });
  return (
    <div className={classes.container}>
      {currentWeatherDataIsLoading && <div>{t("loading", { ns: "app" })}</div>}
      {currentWeatherDataError && (
        <div>
          {t("forecastErrorLoading", { ns: "app" })}
          <button>{t("tryOneMore", { ns: "app" })}</button>
        </div>
      )}
      {currentWeatherData && (
        <>
          <div className={classes.currentWeatherData}>
            <div className={classes.currentWeatherContainer}>
              <Typography
                variant="h5"
                component="div"
                color="primary"
                textAlign="center"
              >
                {t("currentWeatherHeader")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div className={classes.currentWeatherStatus}>
                    <Typography
                      variant="h7"
                      component="span"
                      textAlign="center"
                    >
                      {currentWeatherData.current.condition.text}
                    </Typography>
                    <img src={currentWeatherData.current.condition.icon} alt="condition" />
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div className={classes.currentWeatherStyles}>
                    {settings.metricSystem === "celsius"
                      ? `${currentWeatherData.current.temp_c} °C`
                      : `${currentWeatherData.current.temp_f} °F'`}
                  </div>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={dropImg} alt="temperatures" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {currentWeatherData.current.humidity}%
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={cloudyImg} alt="temperatures" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {currentWeatherData.current.cloud}%
                    </Typography>
                  </div>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={windImg} alt="windImg" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {settings.metricSystem === "celsius"
                        ? `${currentWeatherData.current.wind_kph} km/h`
                        : `${currentWeatherData.current.wind_mph} mph`}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img
                      src={
                        theme.palette.mode === "light"
                          ? windDirectionImg
                          : windDirectionDarkImg
                      }
                      alt="temperatures"
                      width="35px"
                    />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {currentWeatherData.current.wind_dir}
                    </Typography>
                  </div>
                </Box>
              </Box>
            </div>
            <div className={classes.forecastWeatherContainer}>
              <Typography
                variant="h5"
                component="div"
                color="primary"
                textAlign="center"
              >
                {t("currentForecastHeader")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img
                      src={temperaturesImg}
                      alt="temperatures"
                      width="35px"
                    />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {settings.metricSystem === "celsius"
                        ? `${forecastWeatherData.forecast.forecastday[0].day.mintemp_c}°C — ${forecastWeatherData.forecast.forecastday[0].day.maxtemp_c}°C`
                        : `${forecastWeatherData.forecast.forecastday[0].day.mintemp_f}°F — ${forecastWeatherData.forecast.forecastday[0].day.maxtemp_f}°F`}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={windImg} alt="wind" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {settings.metricSystem === "celsius"
                        ? `${forecastWeatherData.forecast.forecastday[0].day.maxwind_kph} km/h`
                        : `${forecastWeatherData.forecast.forecastday[0].day.maxwind_mph} mph`}
                    </Typography>
                  </div>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={dropImg} alt="temperatures" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {
                        forecastWeatherData.forecast.forecastday[0].day
                          .avghumidity
                      }
                      %
                    </Typography>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <img src={cloudyImg} alt="cloudy" width="35px" />
                    <Typography
                      variant="body1"
                      component="span"
                      textAlign="center"
                    >
                      {forecastWeatherData["current"]
                        ? forecastWeatherData.current.cloud
                        : forecastWeatherData.forecast.forecastday[0].hour[0]
                            .cloud}
                      %
                    </Typography>
                  </div>
                </Box>

                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={[
                      classes.currentWeatherStyles,
                      classes.currentWeatherStatus,
                    ].join(" ")}
                  >
                    <div
                      className={[
                        classes.currentWeatherStyles,
                        classes.currentWeatherStatus,
                      ].join(" ")}
                    >
                      <img src={rainyImg} alt="rany chance" width="35px" />
                      <Typography
                        variant="body1"
                        component="span"
                        textAlign="center"
                      >
                        {forecastWeatherData.forecast.forecastday[0].day
                          ?.daily_chance_of_rain ||
                          forecastWeatherData.forecast.forecastday[0].hour[0]
                            .chance_of_rain}
                        %
                      </Typography>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div
                      className={[
                        classes.currentWeatherStyles,
                        classes.currentWeatherStatus,
                      ].join(" ")}
                    >
                      <img src={snowImg} alt="rany chance" width="35px" />

                      <Typography
                        variant="body1"
                        component="span"
                        textAlign="center"
                      >
                        {forecastWeatherData.forecast.forecastday[0].day
                          ?.daily_chance_of_snow ||
                          forecastWeatherData.forecast.forecastday[0].hour[0]
                            .chance_of_snow}
                        %
                      </Typography>
                    </div>
                  </div>
                </Box>
              </Box>
            </div>
          </div>
          <div>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              textAlign="center"
              marginBottom="40px"
              marginTop="40px"
            >
              {t("hourlyForecast")}
            </Typography>
            <div className={classes.hourlyForecastContainer} ref={scrollRef}>
              {forecastWeatherData.forecast.forecastday[0].hour.map(
                (hour, index) => (
                  <Box
                    key={hour.time}
                    className={classes.horlyForecastCard}
                    sx={{
                      "& > :not(style)": {
                        height: "200px",
                        width: "150px",
                        padding: "10px 0px",
                      },
                      margin: "10px 0px",
                    }}
                  >
                    <Paper
                      elevation={24}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "-20px 0px 20px 0px #00000033",
                      }}
                    >
                      <Typography variant="h6" color="secondary">
                        {moment(hour.time).format("HH:mm")}
                      </Typography>
                      <img
                        src={hour.condition.icon}
                        width="80px"
                        height="80px"
                        alt="condition icon"
                      />
                      <Typography variant="body1">
                        {settings.metricSystem === "celsius"
                          ? `${hour.temp_c}°C`
                          : `${hour.temp_f}°F`}
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        {hour.condition.text}
                      </Typography>
                    </Paper>
                  </Box>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Current;
