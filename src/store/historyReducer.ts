import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HistoryEntry = any;

type HistoryState = {
    history: {
        open: HistoryEntry[],
        entries: HistoryEntry[],
    },
};

const historyInitialState: HistoryState = {
    history: {
        open: [],
        entries: [],
    },
};

const historySlice = createSlice({
   name: "history",
   initialState: historyInitialState,
   reducers: {
       ADD_HISTORY_ENTRY: (state, action: PayloadAction<HistoryEntry>) => {
           state.history.entries.push(action.payload);
           console.log("Added to history entries: " + action.payload);
       },
       ADD_OPEN_TAB: (state, action: PayloadAction<HistoryEntry>) => {
           state.history.open.push(action.payload);
           console.log("Added to open tabs: " + action.payload);
       },
       CLEAR_HISTORY: (state) => {
           state.history.entries = [];
           console.log("Cleared history");
       },
   },
});

export const { ADD_HISTORY_ENTRY, ADD_OPEN_TAB, CLEAR_HISTORY } = historySlice.actions;

export default historySlice.reducer;