import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UPDATE_IMPORTED } from "./settingsReducer";

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
       IMPORT_HISTORY: (state) => {
           state.entries = [];
           console.log("Importing history... App sending query");
           chrome.tabs.query({active: true, currentWindow: true}, tabs => {
               chrome.tabs.sendMessage(tabs[0].id as number, { from: "app", type: "GetHistory" }, response => {
                   if (response && response.history && response.history.entries > 0) {
                       state.entries = response.history;
                       UPDATE_IMPORTED();
                       console.log("History received by app:");
                       console.log(state.entries);
                   }
               });
           });
       },
   },
});

export const { ADD_HISTORY_ENTRY, ADD_OPEN_TAB, CLEAR_HISTORY, IMPORT_HISTORY } = historySlice.actions;

export default historySlice.reducer;