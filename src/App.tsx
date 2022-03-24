import React, {FC, useState} from 'react';
import './App.css';

import History from "./UI/History/history";
import Visualize from "./UI/Visualize/visualize";
import Settings from "./UI/Settings/settings";
import Bar from "./UI/Bar/bar";

const App: FC = () => {
    enum Pages {
        History=0,
        Visualize=1,
        Settings=2,
    };

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
