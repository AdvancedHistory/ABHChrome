import store from "./store";

let history_arr: HistoryEntry[] = [];

// On install, run function
chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Advanced Browser History!");
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({'url':"index.html"});
});

const getHistory = () => {
    chrome.history.search({text: "", maxResults: 10000, startTime: 0}, (historyItems) => {
        history_arr = [];
        for (let i = 0; i < historyItems.length; i++) {
            const item = historyItems[i];
            const [date, time] = (new Date(item.lastVisitTime as number)).toLocaleString(navigator.language, {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).split(", ");
            history_arr.push({
                date: date,
                time: time,
                title: item.title as string,
                link: item.url as string,
            });
        }
    });
};

getHistory();

// Event listener for recieveing messages from content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.to === "background" && request.type === "GetHistory") {
            sendResponse({ history: history_arr });
        }
    }
);

// // Event listener for each minute
// chrome.alarms.onAlarm.addListener(function(alarm) {
//     getHistory();
// });
//
// // Event listener for page load
// chrome.tabs.onUpdated.addListener( function(tabId: number, changeInfo: TabChangeInfo, tab: Tab){
//    if(changeInfo.status === "complete" && (tab.url as string).startsWith("http")){
//        //store.dispatch(ADD_OPEN_TAB(tab.url as string));
//    }
// });
