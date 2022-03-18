import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
    settings: {
        version: string,
    },
};

const settingsInitialState: SettingsState = {
    settings: {
        version: '0.1.0',
    },
};

const settingsSlice = createSlice({
    name: "history",
    initialState: settingsInitialState,
    reducers: {
        RESET_SETTINGS: (state) => {
            state.settings = settingsInitialState.settings;
        },
    },
});

export const { RESET_SETTINGS } = settingsSlice.actions;

export default settingsSlice.reducer;