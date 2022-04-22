import {combineReducers, createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {tokenReducer} from "./reducers/tokenReducer";

const rootReducer = combineReducers({
    token: tokenReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
