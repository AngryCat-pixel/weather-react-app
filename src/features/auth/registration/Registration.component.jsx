import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import { createTheme } from "@mui/material/styles";
import cl from "./registration.module.css";
import { useDispatch } from "react-redux";
import { authorization } from "./../authSlice";
import { findUserByEmail } from "../../../utils/findUserByEmail";

const theme = createTheme();

export const Registration = () => {
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
    user.email = user.email.toLowerCase();
    user.email = `${user.email.match(/.*\@/)[0].replace(/\./g, "")}${
      user.email.match(/\@(.*)/)[1]
    }`;
    // validate
    // checkUserAlready
    if (findUserByEmail(user.email)) {
      setErrors({ email: { error: true, msg: t("incorrectregister") } });
      return;
    }
    // save
    saveUser(user);
    // update global
    dispatch(authorization(user));
  };

  const saveUser = (user) => {
    let users = localStorage.getItem("users");
    if (!users) {
      users = [];
    } else {
      users = JSON.parse(users);
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
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
                  pattern: "[A-z]{2,20}",
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
                  pattern: "[A-z]{2,20}",
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
