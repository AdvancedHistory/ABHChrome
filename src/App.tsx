import React, { FC, useEffect, useState } from 'react';
import './App.css';
import History from "./UI/History/history";
import Visualize from "./UI/Visualize/visualize";
import Settings from "./UI/Settings/settings";
import Bar from "./UI/Bar/bar";

import { useAppDispatch, useAppSelector } from "./store";
import { SET_HISTORY } from "./store/historyReducer";

enum Pages {
    History=0,
    Visualize=1,
    Settings=2,
}

const App: FC = () => {

    // Gather the state and dispatch for interacting with the store
    const dispatch = useAppDispatch();

    const { entries } = useAppSelector((state) => state.history );
    const { categories } = useAppSelector((state) => state.categories );

    const [active_tab, switch_tab]  = useState<number>(0);
    const [browser_history, set_browser_history] = useState<HistoryEntry[]>([]);

    // Once, send a message to the background script to request the history
    // Until this is loaded, the history will use the previous history in state.
    useEffect(() => {
        console.log("Entries: ", entries);
        console.log("Importing history from browser");
        chrome.runtime.sendMessage({to: "background", type: "GetHistory"}, function (response) {
            if (response) {
                set_browser_history(response.history);
                console.log("App script got history from service worker");
                console.log(response.history);
                dispatch(SET_HISTORY(response.history));
            }
        });
    }, [dispatch, entries]);

    //fills in the categories for every item in the history according to the rules from categories
    const category_history = [...browser_history];
    category_history.forEach((item:HistoryEntry) => {
        if(item.categories===undefined){
            item.categories=[]
            for(let cat=0; cat < categories.length; cat++) {
                for(let pat=0; pat< categories[cat].patterns.length; pat++) {
                    if(item.title.match(new RegExp(categories[cat].patterns[pat])) !== null || item.url.match(new RegExp(categories[cat].patterns[pat])) !== null){
                        if(item.categories!==undefined){
                            item.categories.push(categories[cat].name);
                            break;
                        }
                    }
                }
            }
        }
    });

    //Main Web Layout
    return (
        <div className="App">
            <Bar  active={active_tab} update={switch_tab}/>
            <div id="bottom">
                {active_tab === Pages.History ? <History browser_history={category_history}/> : ""}
                {active_tab === Pages.Visualize ? <Visualize browser_history={category_history}/> : ""}
                {active_tab === Pages.Settings ? <Settings /> : ""}
            </div>
        </div>
    );
};

export default App;
