import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '0c203b80f3msh98b28a865fde900p12f9aejsn8120f05b08e0';
const API_HOST = 'weatherapi-com.p.rapidapi.com';
export const weatherAPI = createApi({
    reducerPath: 'weatherAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://weatherapi-com.p.rapidapi.com' }),
    endpoints: (build) => ({
        fetchSearch: build.query({
            query: (query) => ({
                url: `/search.json?q=${query}`,
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': API_HOST,
                },
            }),
        }),
    }),
});
