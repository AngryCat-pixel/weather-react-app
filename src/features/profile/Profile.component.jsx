import React, { useState } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import CelsiusIco from "./img/any/celsius.png";
import FahrenheitIco from "./img/any/fahrenheit.png";
import DarkIco from "./img/any/dark.png";
import LightIco from "./img/any/light.png";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserData } from "../auth/authSlice";
import { selectSettings, inicializeSettings } from "./settingsSlice";
import { createSession, saveUser } from "../auth/utils";
import { saveSettings } from "./utils";
import { updateUserDataEverywhere } from "../auth/utils";

const Profile = () => {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();

  const styleForm = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "490px",
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

  return (
    <Container component="div" maxWidth="sx">
      <CssBaseline />
      <Box>
        <Stack direction="row" spacing={2}>
          <Button
            color="primary"
            sx={{
              marginTop: 3,
              marginBottom: 3,
              fontWeight: "bold",
            }}
            variant="outlined"
            startIcon={<KeyboardArrowLeftIcon />}
          >
            {t("back")}
          </Button>
        </Stack>

        <Box sx={{ bgcolor: "#e6e6e680", height: "auto" }}>
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
              justifyContent: "space-evenly",
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
                <InputLabel
                  // color="#ff0000"
                  shrink
                  htmlFor="name-input"
                  sx={styleLable}
                >
                  {t("name")}
                </InputLabel>
                <TextField
                  variant="filled"
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
                  variant="filled"
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
                <InputLabel shrink htmlFor="email-input" sx={styleLable}>
                  {t("email")}
                </InputLabel>
                <TextField
                  variant="filled"
                  color="primary"
                  id="email-input"
                  value={newUser.email}
                  name="email"
                  onChange={handleUpdateUser}
                  focused
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
                  variant="filled"
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
                  variant="filled"
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
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  marginTop: 3,
                }}
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
                  label={t("lableTheme")}
                  control={
                    <ThemeUISwitch
                      name="theme"
                      onChange={handleUpdateSetting}
                      sx={{ m: 1 }}
                      checked={newSettings.theme === "dark" ? true : false}
                    />
                  }
                />
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
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 3,
                }}
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
