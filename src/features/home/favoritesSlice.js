import { createSlice } from "@reduxjs/toolkit";

export const defaultFavorites = {
  cities: [],
  sports: { cricket: [], football: [], golf: [] },
  userId: "",
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: defaultFavorites,
  reducers: {
    inicializeFavorites: (state, action) => {
      let newState = { ...defaultFavorites };
      if ("cities" in action.payload) {
        newState.cities = action.payload.cities;
      }
      if ("sports" in action.payload) {
        newState.sports = action.payload.sports;
      }
      newState.userId = action.payload.userId;
      return { ...newState };
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    removeSportEvent: (state, action) => {
      state.sports[action.payload.sportName] = state.sports[
        action.payload.sportName
      ].filter((event) => event.id !== action.payload.id);
    },
    addSportEvent: (state, action) => {
      state.sports[action.payload.sportName].push(action.payload.event);
    },
  },
});

export const {
  inicializeFavorites,
  removeCity,
  addCity,
  removeSportEvent,
  addSportEvent,
} = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
