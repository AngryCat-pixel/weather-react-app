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
import React from "react";
import { useTranslation } from "react-i18next";

export const SportEvents = () => {
  const { t } = useTranslation(["weather", "errors"]);
  return (
    <Box
      sx={{
        height: "auto",
        p: 1,
      }}
    >
      <CssBaseline />
      <Box>
        <Typography sx={{ mt: 6 }} variant="h6" component="div">
          {t("saveEvents")}
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
              <ListItemText primary="Sport event" />
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
  );
};
