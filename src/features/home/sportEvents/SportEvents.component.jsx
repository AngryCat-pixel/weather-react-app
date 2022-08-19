import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { fontGrid } from "@mui/material/styles/cssUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { removeSportEvent, selectFavorites } from "../favoritesSlice";
import { useSyncFavorites } from "../utils";
import EventCard from "./EventCard.component";

export const SportEvents = () => {
  const { t } = useTranslation(["weather", "errors"]);
  const [selectedSportName, setSelectedSportName] = useState("");
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  useSyncFavorites(favorites);
  const removeSportEventHandler = (sportName, event) => {
    dispatch(removeSportEvent({ sportName, id: event.id }));
  };
  const clickHandler = (sportName) => {
    if (selectedSportName === sportName) {
      setSelectedSportName("");
    } else {
      setSelectedSportName(sportName);
    }
  };
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <CssBaseline />
      <Box>
        <Typography
          sx={{ mt: 6, textAlign: "center" }}
          variant="h6"
          component="div"
        >
          {t("saveEvents")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {Object.keys(favorites.sports).map((sportName) => (
            <Box
              key={sportName + "Container"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
              }}
            >
              <Button
                onClick={() => clickHandler(sportName)}
                variant="text"
                color={
                  selectedSportName === sportName ? "secondary" : "primary"
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                {sportName}
              </Button>
              {selectedSportName === sportName &&
                favorites.sports[sportName].map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    removeSportEventHandler={() =>
                      removeSportEventHandler(sportName, event)
                    }
                  />
                ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
