import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../../hooks/useDebounce";
import { weatherAPI } from "../../weather/weatherAPI";

export const Cities = () => {
  const { t } = useTranslation(["weather", "errors"]);
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
  return (
    <Box
      sx={{
        height: "auto",
        p: 1,
      }}
    >
      <CssBaseline />
      {error ? (
        <Typography variant="h6" color="error">
          {t("unknown", { ns: "errors" })}
        </Typography>
      ) : (
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "21%",
            }}
          >
            <Typography
              sx={{ mt: 6, width: "max-content" }}
              variant="h6"
              component="div"
            >
              {t("likesSitiTitle")}
            </Typography>
            <List
              sx={{
                width: "300px",
              }}
            >
              <ListItem
                sx={{
                  pl: 0,
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                }
              >
                <Link href="#">
                  <ListItemText primary="Запоріжжя" />
                </Link>
              </ListItem>
              <Divider
                variant="inset"
                component="div"
                sx={{
                  margin: 0,
                }}
              />
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};
