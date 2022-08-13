import React from "react";
import { Cities } from "../features/home/cities";
import { SportEvents } from "../features/home/sportEvents";
import Container from "@mui/material/Container";
import { Menu } from "../features/menu/Menu.component";

const HomePage = () => {
  return (
    <>
      <Menu />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Cities />
        <SportEvents />
      </Container>
    </>
  );
};

export default HomePage;
