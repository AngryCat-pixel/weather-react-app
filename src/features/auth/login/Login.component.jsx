import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import classes from "./login.module.css";
import { findUserByEmail } from "../../../utils/findUserByEmail";
import { useDispatch } from "react-redux";
import { selectAuth, authorization } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

export const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (auth) {
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [auth, authState]);

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
    user.email = user.email.toLowerCase();
    user.email = `${user.email.match(/.*\@/)[0].replace(/\./g, "")}${
      user.email.match(/\@(.*)/)[1]
    }`;
    // validate
    // checkUserAlready
    const foundUser = findUserByEmail(user.email);
    if (!foundUser) {
      // отобразить сообщение о том что юзер уже зарегистрирован
      setErrors({ email: { error: true, msg: t("incorrectlogin") } });
      return;
    } else if (foundUser.password !== user.password) {
      setErrors({ email: { error: true, msg: t("incorrectlogin") } });
      return;
    }
    createSession(foundUser);
    dispatch(authorization(foundUser));
  };

  const createSession = (user) => {
    localStorage.setItem("session", JSON.stringify(user));
    return;
  };

  // useEffect(() => {
  //   setError(true);
  //   setErrorMsg("Bika");
  // },[])

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
