import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "0c203b80f3msh98b28a865fde900p12f9aejsn8120f05b08e0";
const API_HOST = "weatherapi-com.p.rapidapi.com";
export const weatherAPI = createApi({
  reducerPath: "weatherAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weatherapi-com.p.rapidapi.com",
  }),
  endpoints: (build) => ({
    fetchSearch: build.query({
      query: (query) => ({
        url: `/search.json?q=${query}`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }),
    }),
    fetchForecast: build.query({
      query: ({ cityName, forecastDate }) => ({
        url: `/forecast.json?q=${cityName}&days=3${
          forecastDate ? `&dt=${forecastDate}` : ""
        }`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }),
    }),
    fetchHistory: build.query({
      query: ({ cityName, historyDate }) => ({
        url: `/history.json?q=${cityName}${
          historyDate ? `&dt=${historyDate}` : ""
        }`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }),
    }),
    fetchSports: build.query({
      query: ({ cityName }) => ({
        url: `/sports.json?q=${cityName}`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }),
    }),
  }),
});
