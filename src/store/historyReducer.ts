import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const historyInitialState: HistoryState = {
    entries: [],
};

// HistoryState slice with custom reducers
const historySlice = createSlice({
   name: "history",
   initialState: historyInitialState,
   reducers: {
       // Add a new entry to the history
       ADD_HISTORY_ENTRY: (state, action: PayloadAction<HistoryEntry>) => {
           state.entries.push(action.payload);
           console.log("REDUX: Added to history entries: " + action.payload);
       },
       // Set the history entries to a given array of history entries
       SET_HISTORY: (state, action: PayloadAction<HistoryEntry[]>) => {
           state.entries = action.payload;
           console.log("REDUX: Imported history to redux: " + action.payload.length);
       },
       // Clear the stored history
       CLEAR_HISTORY: (state) => {
           state.entries = [];
           console.log("REDUX: Cleared history");
       },
   },
});

export const { ADD_HISTORY_ENTRY, SET_HISTORY, CLEAR_HISTORY } = historySlice.actions;

export default historySlice.reducer;