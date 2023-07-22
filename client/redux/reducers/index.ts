import {combineReducers, AnyAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
//import {diff} from "jsondiffpatch";

const reducer = combineReducers({});

const finalReducer = (state: ReturnType<typeof reducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return state;
    } else {
        return reducer(state, action);
    }
};

export default finalReducer;
