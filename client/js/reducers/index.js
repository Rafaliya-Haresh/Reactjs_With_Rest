import { combineReducers } from "redux";

import LoginStore from "./LoginStore";
import ProductStore from "./ProductStore";

const reducers = combineReducers({
    LoginStore,
    ProductStore
});

export default reducers;