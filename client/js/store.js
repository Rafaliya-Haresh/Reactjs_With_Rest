import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middleware = applyMiddleware(thunk);

const initStore = (initialState = {}) => {
    return createStore(reducers, initialState, middleware);
}
export default  initStore;
