import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UPDATE_IMPORTED } from "./settingsReducer";
import {useAppDispatch} from "./index";

const historyInitialState: HistoryState = {
    open: [],
    entries: [],
};

const historySlice = createSlice({
   name: "history",
   initialState: historyInitialState,
   reducers: {
       ADD_HISTORY_ENTRY: (state, action: PayloadAction<HistoryEntry>) => {
           state.entries.push(action.payload);
           console.log("Added to history entries: " + action.payload);
       },
       ADD_OPEN_TAB: (state, action: PayloadAction<HistoryEntry>) => {
           state.open.push(action.payload);
           console.log("Added to open tabs: " + action.payload);
       },
       CLEAR_HISTORY: (state) => {
           state.entries = [];
           state.open = [];
           console.log("Cleared history");
       },
       IMPORT_HISTORY: (state, action: PayloadAction<HistoryEntry[]>) => {
           state.entries = action.payload;
           console.log("Imported history to redux: " + action.payload.length);
       },
   },
});

export const { ADD_HISTORY_ENTRY, ADD_OPEN_TAB, CLEAR_HISTORY, IMPORT_HISTORY } = historySlice.actions;

export default historySlice.reducer;