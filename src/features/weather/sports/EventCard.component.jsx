import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const EventCard = ({ checkIsFavorite, toggleFavorite, event, sportName }) => {
  const { t } = useTranslation(["weather", "app"]);
  return (
    <Paper
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
      <IconButton
        aria-label="delete"
        size="large"
        onClick={(e) => {
          toggleFavorite(sportName, event);
        }}
      >
        {checkIsFavorite(sportName, `${event.match}${event.start}`) ? (
          <Favorite />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>
      <div>
        <Typography sx={{ fontWeight: "bold" }}>{event.match}</Typography>
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
  );
};

export default EventCard;
