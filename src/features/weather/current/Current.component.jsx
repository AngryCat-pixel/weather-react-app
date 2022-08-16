import React from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import moment from "moment";
import classes from "./current.module.css";
import { useHorizontalScroll } from "../../../hooks/useHorizontalScroll";
import { useTranslation } from "react-i18next";
import temperaturesImg from "./img/temperatures.png";
import windImg from "./img/wind.png";
import rainyImg from "./img/rainy.png";
import snowImg from "./img/snow.png";
import cloudyImg from "./img/cloud.png";
import dropImg from "./img/drop.png";
import windDirectionImg from "./img/windDirection.png";

const Current = ({ weatherData, currentWeatherData, settings }) => {
  const { t } = useTranslation("weather");
  const scrollRef = useHorizontalScroll();
  return (
    <div className={classes.container}>
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
                <Typography variant="h7" component="span" textAlign="center">
                  {currentWeatherData.condition.text}
                </Typography>
                <img src={currentWeatherData.condition.icon} />
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.currentWeatherStyles}>
                {settings.metricSystem === "celsius"
                  ? `${currentWeatherData.temp_c} °C`
                  : `${currentWeatherData.temp_f} °F'`}
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
                <Typography variant="body1" component="span" textAlign="center">
                  {currentWeatherData.humidity}%
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
                <Typography variant="body1" component="span" textAlign="center">
                  {currentWeatherData.cloud}%
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
                <Typography variant="body1" component="span" textAlign="center">
                  {settings.metricSystem === "celsius"
                    ? `${currentWeatherData.wind_kph} km/h`
                    : `${currentWeatherData.wind_mph} mph`}
                </Typography>
              </div>
              <Divider orientation="vertical" flexItem />
              <div
                className={[
                  classes.currentWeatherStyles,
                  classes.currentWeatherStatus,
                ].join(" ")}
              >
                <img src={windDirectionImg} alt="temperatures" width="35px" />
                <Typography variant="body1" component="span" textAlign="center">
                  {currentWeatherData.wind_dir}
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
                <img src={temperaturesImg} alt="temperatures" width="35px" />
                <Typography variant="body1" component="span" textAlign="center">
                  {settings.metricSystem === "celsius"
                    ? `${weatherData.day.mintemp_c}°C — ${weatherData.day.maxtemp_c}°C`
                    : `${weatherData.day.mintemp_f}°F — ${weatherData.day.maxtemp_f}°F`}
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
                <Typography variant="body1" component="span" textAlign="center">
                  {settings.metricSystem === "celsius"
                    ? `${weatherData.day.maxwind_kph} km/h`
                    : `${weatherData.day.maxwind_mph} mph`}
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
                <Typography variant="body1" component="span" textAlign="center">
                  {currentWeatherData.humidity}%
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
                <Typography variant="body1" component="span" textAlign="center">
                  {currentWeatherData.cloud}%
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
                    {weatherData.day.daily_chance_of_rain}%
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
                    {weatherData.day.daily_chance_of_snow}%
                  </Typography>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
      <div className="horlyForecast">
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
          {weatherData.hour.map((hour, index) => (
            <Box
              key={hour.time_epoch}
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
                <img src={hour.condition.icon} width="80px" height="80px" />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Current;
