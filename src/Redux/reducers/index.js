/*
import lotoPageCounterReducer from "./loto";
//ADD MORE REDUCERS
// ....................................//

import {combineReducers} from "redux";

const rootReducer=combineReducers({
    lotoPage:lotoPageCounterReducer,
});

export default rootReducer
*/

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app";
import auth from "./auth";
import todos from "./DashPages/todos"

const appReducers = history =>
    combineReducers({
        router: connectRouter(history),
            app,
            auth,
            todos
    });

export default appReducers;

