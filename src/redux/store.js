import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {todoReducer} from "./slices/todo.slice";


const rootReducer = combineReducers({
        todo: todoReducer
});


const store = configureStore({
    reducer: rootReducer
});


export {store};