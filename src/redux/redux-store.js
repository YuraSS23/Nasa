import {Reducer} from "./reducer";
import {combineReducers, legacy_createStore} from "redux";

let rootReducer = combineReducers({
    appPage : Reducer,
})

export let store = legacy_createStore(rootReducer)