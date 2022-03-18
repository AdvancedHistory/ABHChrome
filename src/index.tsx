import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import {Store} from "webext-redux";
import store from "./store";

import App from './App';
import './index.css';


// This code sets up a persistor and store for the extension.
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistStore(store)}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);



// This would allow for communication between the extension and the background script.
// This would replace the above code if we could get it to work.
// You would need to remove the import of the store above for this to compile.
/*const store = new Store({
    portName: 'ABH_STORE',
});

store.ready().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistStore(store)}>
                    <App />
                </PersistGate>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
});*/
