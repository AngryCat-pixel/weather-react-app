import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addSportEvent,
  removeSportEvent,
  selectFavorites
} from "../../home/favoritesSlice";
import { weatherAPI } from "../weatherAPI";
import EventCard from "./EventCard.component";
import classes from "./sports.module.css";

const Sports = ({ cityName }) => {
  const { t } = useTranslation(["weather", "app"]);
  const {
    data: sportsData,
    isLoading: sportsDataIsLoading,
    error: sportsDataError,
  } = weatherAPI.useFetchSportsQuery({ cityName });
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const checkIsFavorite = (sportName, id) => {
    return favorites.sports[sportName].find((event) =>
      event.id === id ? true : false
    );
  };
  const toggleFavorite = (sportName, event) => {
    if (checkIsFavorite(sportName, `${event.match}${event.start}`)) {
      dispatch(
        removeSportEvent({
          sportName,
          id: `${event.match}${event.start}`,
        })
      );
    } else {
      dispatch(
        addSportEvent({
          sportName,
          event: { ...event, id: `${event.match}${event.start}` },
        })
      );
    }
  };
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
                <EventCard
                  key={`${event.match}${event.start}`}
                  event={event}
                  toggleFavorite={toggleFavorite}
                  checkIsFavorite={checkIsFavorite}
                  sportName="football"
                />
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
                <EventCard
                  key={`${event.match}${event.start}`}
                  event={event}
                  toggleFavorite={toggleFavorite}
                  checkIsFavorite={checkIsFavorite}
                  sportName="cricket"
                />
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
                <EventCard
                  key={`${event.match}${event.start}`}
                  event={event}
                  toggleFavorite={toggleFavorite}
                  checkIsFavorite={checkIsFavorite}
                  sportName="golf"
                />
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
