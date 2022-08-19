import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../auth/authSlice";
import { createSession, updateUserDataEverywhere } from "../auth/utils";
import { inicializeSettings, selectSettings } from "./settingsSlice";
import { saveSettings } from "./utils";

import CelsiusIco from "./img/any/celsius.png";
import DarkIco from "./img/any/dark.png";
import FahrenheitIco from "./img/any/fahrenheit.png";
import LightIco from "./img/any/light.png";

const Profile = () => {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const styleForm = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "500px",
    alignItems: "center",
    marginBottom: "10px",
  };
  const styleLable = {
    position: "inherit",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#006bf5",
  };
  const settings = useSelector(selectSettings);
  const [newSettings, setNewSettings] = useState(settings);
  const user = useSelector(selectUser);
  const [newUser, setNewUser] = useState(user);

  const handleUpdateUser = (event) => {
    if (event.target.name === "email") {
      setNewUser({
        ...newUser,
        [event.target.name]: event.target.value,
        virificated: false,
      });
      updateUserDataEverywhere(
        dispatch,
        {
          ...newUser,
          [event.target.name]: event.target.value,
          virificated: false,
        },
        { ...settings }
      );
    } else {
      setNewUser({ ...newUser, [event.target.name]: event.target.value });
      updateUserDataEverywhere(
        dispatch,
        { ...newUser, [event.target.name]: event.target.value },
        { ...settings }
      );
    }
  };
  const handleUpdateSetting = (event) => {
    const name = event.target.name;
    let value = false;
    if (name === "theme") {
      value = newSettings.theme === "light" ? "dark" : "light";
    } else if (name === "metricSystem") {
      value = newSettings.metricSystem === "celsius" ? "fahrenheit" : "celsius";
    }
    if (!value || !name) {
      return;
    }
    setNewSettings({ ...newSettings, [name]: value });
    // сохранение в localStorage
    saveSettings({ ...newSettings, [name]: value });
    // сохранение в глобальный стейт
    dispatch(inicializeSettings({ ...newSettings, [name]: value }));
    // обновление сессии
    createSession(newUser.id);
  };

  const logoutHandler = () => {
    localStorage.removeItem("session");
    dispatch(logout());
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
  const MetricsUiSwitch = styled(Switch)(({ theme }) => ({
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
          backgroundImage: `url(${FahrenheitIco})`,
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
        backgroundImage: `url(${CelsiusIco})`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{
        background: theme.palette.mode === "light" ? "" : "rgba(0, 0, 0, 0.44)",
      }}
    >
      <CssBaseline />
      <Box>
        <Box sx={{ height: "auto" }}>
          <Typography
            variant="h4"
            component="h4"
            color="secondary"
            sx={{
              paddingTop: 3,
              paddingLeft: 3,
              paddingBottom: 3,
              textAlign: "center",
            }}
          >
            {t("title")}
          </Typography>
          <Divider
            variant="inset"
            component="h4"
            sx={{
              margin: 0,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: 3,
              }}
            >
              <FormControl variant="standard" sx={styleForm}>
                <InputLabel shrink htmlFor="name-input" sx={styleLable}>
                  {t("name")}
                </InputLabel>
                <TextField
                  color="primary"
                  id="name-input"
                  focused
                  value={newUser.name}
                  name="name"
                  onChange={handleUpdateUser}
                  sx={{
                    width: "330px",
                  }}
                />
              </FormControl>
              <FormControl variant="standard" sx={styleForm}>
                <InputLabel
                  shrink
                  htmlFor="lastName-input"
                  color="secondary"
                  sx={styleLable}
                >
                  {t("lastName")}
                </InputLabel>
                <TextField
                  color="primary"
                  id="lastName-input"
                  focused
                  value={newUser.lastName}
                  name="lastName"
                  onChange={handleUpdateUser}
                  sx={{
                    width: "330px",
                  }}
                />
              </FormControl>
              <FormControl variant="standard" sx={styleForm}>
                <InputLabel shrink htmlFor="telephone-input" sx={styleLable}>
                  {t("telephone")}
                </InputLabel>
                <TextField
                  color="primary"
                  id="telephone-input"
                  focused
                  value={newUser.phone}
                  name="phone"
                  onChange={handleUpdateUser}
                  sx={{
                    width: "330px",
                  }}
                />
              </FormControl>
              <FormControl variant="standard" sx={styleForm}>
                <InputLabel shrink htmlFor="password-input" sx={styleLable}>
                  {t("password")}
                </InputLabel>
                <TextField
                  color="primary"
                  id="password-input"
                  value={newUser.password}
                  name="password"
                  onChange={handleUpdateUser}
                  focused
                  sx={{
                    width: "330px",
                  }}
                />
              </FormControl>
              <Button
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  marginTop: 3,
                  border: "2px solid",
                }}
                onClick={() => navigate("/")}
              >
                {t("likeSiti")}
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <FormControlLabel
                  control={
                    <MetricsUiSwitch
                      name="metricSystem"
                      onChange={handleUpdateSetting}
                      sx={{ m: 1 }}
                      checked={
                        newSettings.metricSystem === "fahrenheit" ? true : false
                      }
                    />
                  }
                  label={t("lableMetrics")}
                />
              </Box>

              <Button
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 3,
                  border: "2px solid",
                }}
                onClick={logoutHandler}
              >
                {t("logout")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Profile;
