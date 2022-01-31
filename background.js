// On install, run function
chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Advanced Browser History!");
});

// On page load, run function
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
   if(changeInfo.status === "complete"){
       console.log("Loaded tab!");
   }
});