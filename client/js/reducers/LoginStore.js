import { LOGIN, LOGOUT } from "../constants/actionTypes";

// Initial state data
const initialState = {
    userData: {},
    isSuperUser: false
};

// Login store
const LoginStore = (state = initialState, action) => {
    
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, { ...action.payload });
        case LOGOUT:
            return Object.assign({}, state, { isSuperUser: false });
        default:
            return state;
    }
}

export default LoginStore;
