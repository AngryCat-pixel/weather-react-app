import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { selectUser } from "../auth/authSlice";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import useDebounce from "../../hooks/useDebounce";
import { createSession } from "../auth/utils";
import DarkIco from "../profile/img/any/dark.png";
import LightIco from "../profile/img/any/light.png";
import { inicializeSettings, selectSettings } from "../profile/settingsSlice";
import Button from "@mui/material/Button";
import { saveSettings } from "../profile/utils";
import Link from "@mui/material/Link";
import { weatherAPI } from "../weather/weatherAPI";

export const Menu = () => {
  const { t } = useTranslation(["weather", "profile", "errors"]);
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const [newSettings, setNewSettings] = useState(settings);
  const user = useSelector(selectUser);
  const [newUser, setNewUser] = useState(user);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const {
    data: autocomplete,
    isLoading,
    error,
  } = weatherAPI.useFetchSearchQuery(debouncedSearchValue, {
    skip: debouncedSearchValue === "",
  });
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  const onChangeQuery = (event, value) => {
    setSearchValue(event.target.value);
  };

  const selectHandler = (event, value) => {
    setSearchValue(value ? value.name : "");
    navigate(`/weather?cityName=${value.name}`);
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
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        p: 3,
      }}
    >
      <Autocomplete
        value={searchValue}
        onChange={selectHandler}
        onInputChange={onChangeQuery}
        filterOptions={(x) => x}
        selectOnFocus
        clearOnBlur
        noOptionsText={t("noOptions", { ns: "weather" })}
        autoComplete
        autoHighlight
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        loading={isLoading}
        options={autocomplete || []}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={t("searchInput")} />
        )}
      />
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
              onChange={handleUpdateSetting}
              sx={{ m: 1 }}
              checked={newSettings.theme === "dark" ? true : false}
            />
          }
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mr: 3,
            ml: 3,
          }}
        >
          <Button variant="text">UA</Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="text">EN</Button>
        </Stack>
        <Link href="/profile">
          <IconButton color="primary" edge="end" aria-label="delete">
            <AccountBoxIcon fontSize="large" />
          </IconButton>
        </Link>
      </Box>
    </Container>
  );
};
