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

// TODO SEE HISTORY STORED HERE?
// TODO USE PROPS AND PROPS DRILL
// ONLY WORKS WITH EXTENSION RUNNING I THINK
let history: any[] = []

const App: FC = () => {

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id as number, { from: 'app', type: 'GetHistory' }, (response) => {
            if(response){
                history = response.history;
                console.log("History received");
            }
        });
    });

    const [active_tab, switch_tab]  = useState<number>(0);

    return (
        <div className="App">
            <Bar  active={active_tab} update={switch_tab}/>
            <div id="bottom">
                {active_tab === Pages.History ? <History /> : ""}
                {active_tab === Pages.Visualize ? <Visualize /> : ""}
                {active_tab === Pages.Settings ? <Settings /> : ""}
            </div>
        </div>
    );
};

export default App;
