import { createSlice } from "@reduxjs/toolkit";

const settingsInitialState: SettingsState = {
    version: '0.1.0',
    imported: false,
};

// SettingsState slice with custom reducers
// Not the most useful as of now, but important to have for the future
const settingsSlice = createSlice({
    name: "history",
    initialState: settingsInitialState,
    reducers: {
        // Set settings to their default values
        RESET_SETTINGS: (state) => {
            state.version = settingsInitialState.version;
            state.imported = settingsInitialState.imported;
        },
    },
});

export const { RESET_SETTINGS } = settingsSlice.actions;

export default settingsSlice.reducer;