import { createSlice } from '@reduxjs/toolkit';

export const defaultSettings = {
    theme: 'light',
    metricSystem: 'celsius',
    userId: null,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: defaultSettings,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        inicializeSettings: (state, action) => {
            let newState = { ...defaultSettings };
            if ('theme' in action.payload) {
                newState.theme = action.payload.theme;
            }
            if ('metricSystem' in action.payload) {
                newState.metricSystem = action.payload.metricSystem;
            }
            newState.userId = action.payload.userId;
            return { ...newState };
        },
    },
});

export const { inicializeSettings } = settingsSlice.actions;

export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
