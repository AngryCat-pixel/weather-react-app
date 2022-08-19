import React from "react";
import { useTranslation } from "react-i18next";
import { Stack, Button, Divider, CssBaseline } from "@mui/material";

const Language = () => {
  const { i18n } = useTranslation();
  let language = i18n.language;
  const changeLanguage = (newLang) => {
    if (language !== newLang) {
      i18n.changeLanguage(newLang);
    }
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mr: 3,
        ml: 3,
      }}
    >
      <CssBaseline />
      <Button
        variant="text"
        color={language === "ua" ? "secondary" : "primary"}
        onClick={() => changeLanguage("ua")}
      >
        UA
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button
        variant="text"
        color={language === "en" ? "secondary" : "primary"}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </Stack>
  );
};

export default Language;
