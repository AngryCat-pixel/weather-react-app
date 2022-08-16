import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { weatherAPI } from "../weatherAPI";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import classes from "./sports.module.css";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Sports = ({ cityName }) => {
  const { t } = useTranslation(["weather", "app"]);
  const {
    data: sportsData,
    isLoading: sportsDataIsLoading,
    error: sportsDataError,
  } = weatherAPI.useFetchSportsQuery({ cityName });
  return (
    <div>
      {sportsDataIsLoading && <div>{t("loading", { ns: "app" })}</div>}
      <div>
        <Typography
          variant="h4"
          component="h4"
          color="primary"
          textAlign="center"
          sx={{
            mb: 4,
            mt: 4,
          }}
        >
          {t("sportsEvent")}
        </Typography>
        {sportsDataError && (
          <div>
            {t("sportErrorLoading", { ns: "app" })}
            <button>{t("tryOneMore", { ns: "app" })}</button>
          </div>
        )}
        <Container
          component="div"
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div className={classes.footballContainer}>
            <Typography variant="h6" color="secondary" textAlign="center">
              {t("football")}
            </Typography>
            {sportsData && sportsData.football.length > 0 ? (
              sportsData.football.map((event, index) => (
                <Paper
                  key={event.match}
                  elevation={24}
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    boxShadow: "-20px 0px 20px 0px #00000033",
                    mt: 1,
                    minWidth: "400px",
                    maxWidth: "500px",
                    p: 1.5,
                  }}
                >
                  <IconButton aria-label="delete" size="large">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <div key={index}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {event.match}
                    </Typography>
                    <Typography>
                      {t("date")} {event.start}
                    </Typography>
                    <Typography>
                      {t("stadium")} {event.stadium}
                    </Typography>
                    <Typography>
                      {t("country")} {event.country}
                    </Typography>
                    <Typography>
                      {t("tournament")} {event.tournament}
                    </Typography>
                  </div>
                </Paper>
              ))
            ) : (
              <div>{t("noEvents")}</div>
            )}
          </div>
          <div className={classes.cricketContainer}>
            <Typography variant="h6" color="secondary" textAlign="center">
              {t("cricket")}
            </Typography>
            {sportsData && sportsData.cricket.length > 0 ? (
              sportsData.cricket.map((event, index) => (
                <Paper
                  key={event.match}
                  elevation={24}
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    boxShadow: "-20px 0px 20px 0px #00000033",
                    mt: 1,
                    minWidth: "400px",
                    maxWidth: "500px",
                    p: 1.5,
                  }}
                >
                  <IconButton aria-label="delete" size="large">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <div key={index}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {event.match}
                    </Typography>
                    <Typography>
                      {t("date")} {event.start}
                    </Typography>
                    <Typography>
                      {t("stadium")} {event.stadium}
                    </Typography>
                    <Typography>
                      {t("country")} {event.country}
                    </Typography>
                    <Typography>
                      {t("tournament")} {event.tournament}
                    </Typography>
                  </div>
                </Paper>
              ))
            ) : (
              <div>{t("noEvents")}</div>
            )}
          </div>
          <div className={classes.golfContainer}>
            <Typography variant="h6" color="secondary" textAlign="center">
              {t("golf")}
            </Typography>
            {sportsData && sportsData.golf.length > 0 ? (
              sportsData.golf.map((event, index) => (
                <Paper
                  key={event.match}
                  elevation={24}
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    boxShadow: "-20px 0px 20px 0px #00000033",
                    mt: 1,
                    minWidth: "400px",
                    maxWidth: "500px",
                    p: 1.5,
                  }}
                >
                  <IconButton aria-label="delete" size="large">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <div key={index}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {event.match}
                    </Typography>
                    <Typography>
                      {t("date")} {event.start}
                    </Typography>
                    <Typography>
                      {t("stadium")} {event.stadium}
                    </Typography>
                    <Typography>
                      {t("country")} {event.country}
                    </Typography>
                    <Typography>
                      {t("tournament")} {event.tournament}
                    </Typography>
                  </div>
                </Paper>
              ))
            ) : (
              <div>{t("noEvents")}</div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Sports;
