import { AccountBox } from "@mui/icons-material";
import {
  Box, Button,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Link, Switch
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../app/theme/theme.component";
import { selectAuth } from "../auth/authSlice";
import DarkIco from "../profile/img/any/dark.png";
import LightIco from "../profile/img/any/light.png";
import Autocomplete from "./autocomplete/autocomplete.component";
import Language from "./language/language.component";



export const Menu = () => {
  const { t } = useTranslation(["weather", "profile", "errors"]);

  const authorized = useSelector(selectAuth);

  const navigate = useNavigate();
  let location = useLocation();

  const backHandler = () => {
    let from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();

  const handleUpdateTheme = () => {
    localStorage.setItem(
      "theme",
      theme.palette.mode === "light" ? "dark" : "light"
    );
    toggleColorMode();
  };
  const ThemeUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url(${DarkIco})`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#1cc8d4",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${LightIco})`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {authorized && (
          <>
            <Button
              color="primary"
              sx={{
                marginTop: 3,
                marginBottom: 3,
                fontWeight: "bold",
                
              }}
              variant="outlined"
              onClick={backHandler}
            >
              {t("toMain", { ns: "profile" })}
            </Button>
            <Autocomplete />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            label={t("lableTheme", { ns: "profile" })}
            control={
              <ThemeUISwitch
                name="theme"
                onChange={handleUpdateTheme}
                sx={{ m: 1 }}
                checked={theme.palette.mode === "dark" ? true : false}
              />
            }
          />
          <Language />
          {authorized && (
            <Link href="/profile">
              <IconButton color="primary" edge="end" aria-label="delete">
                <AccountBox fontSize="large" />
              </IconButton>
            </Link>
          )}
        </Box>
      </Box>
      <Divider component="div" />
    </Container>
  );
};
