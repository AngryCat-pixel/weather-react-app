import { useTheme, Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { weatherAPI } from "../weatherAPI";
import classes from "./forecast.module.css";

const Forecast = ({ selectDay, selectedDay, cityName, settings }) => {
  const { t } = useTranslation(["weather", "app"]);
  const theme = useTheme();
  const {
    data: forecastData,
    isLoading: forecastDataIsLoading,
    error: forecastDataError,
  } = weatherAPI.useFetchForecastQuery({ cityName, forecastDate: false });
  return (
    <div className={classes.forecastContainer}>
      {forecastDataIsLoading && <div>{t("loading", { ns: "app" })}</div>}
      {forecastDataError && (
        <div>
          {t("forecastErrorLoading", { ns: "app" })}
          <button>{t("tryOneMore", { ns: "app" })}</button>
        </div>
      )}
      {forecastData &&
        forecastData.forecast.forecastday.map((day, index) => (
          <Box
            key={day.date_epoch}
            onClick={() => selectDay(moment(day.date))}
            sx={{
              "& > :not(style)": {
                minHeight: "110px",
                minWidth: "250px",
                p: 1,
                background:
                  selectedDay === day.date ? theme.palette.action.selected : "",
              },
              mt: 1,
            }}
          >
            <Paper
              elevation={24}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color="secondary">
                {day.date}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src={day.day.condition.icon} width="80px" height="80px" />
                <Typography variant="h4">
                  {settings.metricSystem === "celsius"
                    ? `${day.day.avgtemp_c}°C`
                    : `${day.day.avgtemp_f}°F`}
                </Typography>
                <Typography
                  variant="h7"
                  color="secondary"
                  sx={{
                    ml: 1,
                  }}
                >
                  {day.day.condition.text}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}
    </div>
  );
};

export default Forecast;
