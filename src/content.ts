
// Old code from when the app utilized a content script for Chrome API calls
// Kept in  case we want to use it again


// let history_arr: history_element[] = [];

// getHistory();

// console.log("Sending content script to app");
// chrome.runtime.sendMessage({from: "content-script", type: "SendHistory", history: "hello!"}, function response(response) {
//     console.log("Received response from app");
//     console.log(response);
// });


// Listen for messages from the app
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         // First, validate the message's structure.
//         if ((message.from === "app") && (message.type === "GetHistory")) {
//             sendResponse({history: history_arr});
//         }
//     });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message);
//     if ((message.from === "app") && (message.type === "SendHistory")) {
//         console.log("Content script received message from app");
//         sendResponse({ history: history_arr });
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//
//     //console.log("Content script requesting history");
//     chrome.runtime.sendMessage({from: "content-script", type: "GetHistory"}, function (response) {
//         if (response) {
//             history_arr = response.history;
//             console.log("Content script got history from service worker:");
//             console.log(response.history);
//
//             // console.log("Sending message to app");
//             // chrome.runtime.sendMessage({from: "content-script", type: "SendHistory", history: "hello!"}, function response(response) {
//             // });
//         }
//     });
// }, false);

// console.log("Content script loaded");

// if ( window.location.href.startsWith("chrome-extension://") ) {
//
// }