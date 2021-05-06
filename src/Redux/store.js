

import {createStore, applyMiddleware,compose} from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import throttle from "lodash.throttle";
import customMiddleWares from "./middleware";
//import {myLogger} from "./middleware";
import appReducers from "./reducers";

export const history = createBrowserHistory();
const rootReducer = (state, action) => {
    return appReducers(history)(state, action);
};

// add and apply the middleWares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

//include redux logger if not in production
if (process.env.NODE_ENV !== "production") {
    middleWares.push(createLogger());
}

let parseMiddleware = applyMiddleware(...middleWares);

//include dev tools if not in production
if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    parseMiddleware = compose(
        parseMiddleware,
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

//persist data to LS
const persistedState = loadState();

// create the store
let store = createStore(rootReducer, persistedState,parseMiddleware);

//subscribe to store
/*store.subscribe(()=>{
    console.log("store updated", store.getState());
});*/
store.subscribe(
    throttle(() => {
        saveState({ auth: store.getState().auth });
    }, 1000)
);
console.log("STORE::::::", store);


function loadState() {
    try {
        const serializedState = localStorage.getItem("todo-app");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

function saveState(state) {
    try {
        localStorage.setItem("todo-app", JSON.stringify(state));
    } catch (e) {}
}


export default store;