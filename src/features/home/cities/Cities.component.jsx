import { Box, CssBaseline, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { removeCity, selectFavorites } from "../favoritesSlice";
import { useSyncFavorites } from "../utils";
import CityName from "./CityName.component";

export const Cities = () => {
  const { t } = useTranslation(["weather", "errors"]);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  useSyncFavorites(favorites);
  const removeCityHandler = (cityName) => {
    dispatch(removeCity(cityName));
  };

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <CssBaseline />
      <Box>
        <Box>
          <Typography
            sx={{ mt: 6, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            {t("likesSitiTitle")}
          </Typography>
          <List
            sx={{
              minWidth: "250px",
            }}
          >
            {favorites.cities.map((city) => (
              <CityName
                key={city}
                name={city}
                removeCityHandler={removeCityHandler}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
