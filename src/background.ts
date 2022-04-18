let history_arr: HistoryEntry[] = [];

// On install, run function
chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Advanced Browser History!");
});

// On extension click, make a new tab to the extension's page
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({'url':"index.html"});
});

// Event listener for when the request history is sent
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.to === "background" && request.type === "GetHistory") {
            sendResponse({ history: history_arr });
        }
    }
);

// Use Chrome API to get the history of the entire web browser
const getHistory = () => {
    chrome.history.search({text: "", maxResults: 100000, startTime: 0}, (historyItems) => {
        history_arr = [];
        for (let i = 0; i < historyItems.length; ++i) {
            const item = historyItems[i];
            chrome.history.getVisits({url: item.url as string}).then((visits) => {
                visits.map((visit) => {
                    history_arr.push({
                        url: item.url as string,
                        title: item.title as string,
                        time: visit.visitTime as number,
                    });
                });
            });
        }
        history_arr.sort((a, b) => {
            return b.time - a.time;
        });
        console.log(history_arr);
    });
};

getHistory();

// Old code we may want to use later
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
