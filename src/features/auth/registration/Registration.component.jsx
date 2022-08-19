import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import {
  defaultFavorites,
  inicializeFavorites,
} from "../../home/favoritesSlice";
import { saveFavorites } from "../../home/utils";
import {
  defaultSettings,
  inicializeSettings,
} from "../../profile/settingsSlice";
import { saveSettings } from "../../profile/utils";
import { createSession, saveUser, serializeEmail } from "../utils";
import { findUserByEmail } from "../utils/findUserByEmail";
import { authorization } from "./../authSlice";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation("auth");
  const noErrors = {
    email: {
      error: false,
      msg: "",
    },
  };
  const [errors, setErrors] = useState({ ...noErrors });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      email: data.get("email"),
      phone: data.get("phone"),
      name: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
      verificationCode: "0000",
      virificated: false,
    };
    user.email = serializeEmail(user.email);
    // validate
    // checkUserAlready
    if (findUserByEmail(user.email)) {
      setErrors({ email: { error: true, msg: t("incorrectregister") } });
      return;
    }

    user.id = uuid();
    saveUser(user);
    saveSettings({ ...defaultSettings, userId: user.id });
    saveFavorites({ ...defaultFavorites, userId: user.id });
    dispatch(authorization(user));
    dispatch(inicializeSettings({ userId: user.id }));
    dispatch(inicializeFavorites({ userId: user.id }));
    createSession(user.id);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="secondary">
          {t("registration")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t("name")}
                autoFocus
                type="text"
                inputProps={{
                  pattern: "[A-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{2,20}",
                  title: t("codeFormatError"),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                type="text"
                fullWidth
                id="lastName"
                label={t("lastName")}
                name="lastName"
                autoComplete="family-name"
                inputProps={{
                  pattern: "[A-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{2,20}",
                  title: t("codeFormatError"),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="email"
                label={t("email")}
                type="email"
                name="email"
                autoComplete="email"
                error={errors.email.error}
                helperText={errors.email.msg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="telephone"
                label={t("telephone")}
                name="phone"
                autoComplete="telephone"
                inputProps={{
                  pattern: "[+]{0,1}[0-9]{7,12}",
                  title: t("codeTelephoneError"),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{
                  minLength: 5,
                  maxLength: 12,
                }}
              />
            </Grid>
          </Grid>
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            {t("registrBtn")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" color="secondary">
                {t("login")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
