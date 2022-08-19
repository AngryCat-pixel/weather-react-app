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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { inicializeFavorites } from "../../home/favoritesSlice";
import { findFavoritesByUserId } from "../../home/utils/findFavoritesByUserId";
import { inicializeSettings } from "../../profile/settingsSlice";
import { findSettingsByUserId } from "../../profile/utils";
import { authorization, selectAuth } from "../authSlice";
import { createSession } from "../utils/createSession";
import { serializeEmail } from "../utils";
import { findUserByEmail } from "../utils/findUserByEmail";

export const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (auth) {
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [auth, navigate, location]);

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
    setErrors({ ...noErrors });
    const data = new FormData(event.currentTarget);
    let user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    user.email = serializeEmail(user.email);
    // validate
    // checkUserAlready
    const foundUser = findUserByEmail(user.email);
    if (!foundUser) {
      setErrors({ email: { error: true, msg: t("incorrectlogin") } });
      return;
    } else if (foundUser.password !== user.password) {
      setErrors({ email: { error: true, msg: t("incorrectlogin") } });
      return;
    }
    const foundSettings = findSettingsByUserId(user.id);
    const foundFavorites = findFavoritesByUserId(user.id);
    createSession(foundUser.id);
    dispatch(authorization(foundUser));
    dispatch(inicializeSettings(foundSettings));
    dispatch(inicializeFavorites(foundFavorites));
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
          {t("signIn")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            name="email"
            autoComplete="email"
            type="email"
            error={errors.email.error}
            helperText={errors.email.msg}
            autoFocus
          />
          <TextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              minLength: 5,
              maxLength: 12,
            }}
          />
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
            {t("loginBtn")}
          </Button>
          <Grid item>
            <Link href="/registration" variant="body2" color="secondary">
              {t("signUp")}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
