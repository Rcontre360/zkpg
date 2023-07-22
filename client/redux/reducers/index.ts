import {combineReducers, AnyAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {main} from "./main";
//import {diff} from "jsondiffpatch";

const reducer = combineReducers({
    main,
});

const finalReducer = (state: ReturnType<typeof reducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return state;
    } else {
        return reducer(state, action);
    }
};

export default finalReducer;
