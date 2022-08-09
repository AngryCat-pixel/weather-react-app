import React from "react";
import { useTranslation } from "react-i18next";

export const Weather = () => {
  const { t } = useTranslation("user");
  return <div>{t("name")}</div>;
};
