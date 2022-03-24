import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import './App.css';
import History from "./UI/History/history";
import Visualize from "./UI/Visualize/visualize";
import Settings from "./UI/Settings/settings";
import Bar from "./UI/Bar/bar";

import { useAppDispatch, useAppSelector } from "./store";
import { IMPORT_HISTORY } from "./store/historyReducer";
import { UPDATE_IMPORTED } from "./store/settingsReducer";

type AppProps = { history: HistoryState , settings: SettingsState }

enum Pages {
    History=0,
    Visualize=1,
    Settings=2,
}

const App: FC = () => {

    const [active_tab, switch_tab]  = useState<number>(0);
    const [browser_history, set_browser_history] = useState<HistoryEntry[]>([]);

    useEffect(() => {

        chrome.runtime.sendMessage({to: "background", type: "GetHistory"}, function (response) {
            if (response) {
                set_browser_history(response.history);
                console.log("App script got history from service worker:");
                console.log(response.history);

            }
        });
    }, []);

    return (
        <div className="App">
            <Bar  active={active_tab} update={switch_tab}/>
            <div id="bottom">
                {active_tab === Pages.History ? <History browser_history={browser_history}/> : ""}
                {active_tab === Pages.Visualize ? <Visualize /> : ""}
                {active_tab === Pages.Settings ? <Settings /> : ""}
            </div>
        </div>
    );
};

export default App;


// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     console.log("App requesting history from tab: ", tabs[0].url);
//     chrome.tabs.sendMessage(tabs[0].id as number, { from: 'app', type: 'SendHistory' }, (response) => {
//         if(response){
//             browser_history = response.history;
//             console.log("History received");
//         }
//     });
// });
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log(request);
//     if(request.from === "content-script" && request.type === "SendHistory"){
//         sendResponse({success: true});
//     }
// });