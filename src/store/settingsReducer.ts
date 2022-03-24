import { createSlice } from "@reduxjs/toolkit";

const settingsInitialState: SettingsState = {
    version: '0.1.0',
    imported: false,
};

const settingsSlice = createSlice({
    name: "history",
    initialState: settingsInitialState,
    reducers: {
        RESET_SETTINGS: (state) => {
            state.version = settingsInitialState.version;
            state.imported = settingsInitialState.imported;
        },
        UPDATE_IMPORTED: (state) => {
            state.imported = true;
        },
    },
});

export const { RESET_SETTINGS, UPDATE_IMPORTED } = settingsSlice.actions;

export default settingsSlice.reducer;