import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useDebounce from "../../../hooks/useDebounce";
import { weatherAPI } from "../weatherAPI";

export const Cities = () => {
  const { t } = useTranslation(["weather", "errors"]);
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
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 3,
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
          <Autocomplete
            value={searchValue}
            onChange={selectHandler}
            onInputChange={onChangeQuery}
            filterOptions={(x) => x}
            selectOnFocus
            clearOnBlur
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
              width: "21%",
            }}
          >
            <Typography sx={{ mt: 6 }} variant="h6" component="div">
              {t("likesSitiTitle")}
            </Typography>
            <List>
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
    </Container>
  );
};
