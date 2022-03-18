import store from "./store";

import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;
import { ADD_HISTORY_ENTRY, ADD_OPEN_TAB, CLEAR_HISTORY } from "./store/historyReducer";

// On install, run function
chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Advanced Browser History!");
});

// On page load, run function
chrome.tabs.onUpdated.addListener( function(tabId: number, changeInfo: TabChangeInfo, tab: Tab){
   if(changeInfo.status === "complete" && (tab.url as string).startsWith("http")){
       store.dispatch(ADD_OPEN_TAB(tab.url as string));
   }
});