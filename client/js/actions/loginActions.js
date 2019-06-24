import "whatwg-fetch";
import { NotificationManager } from 'react-notifications';
import { LOGIN, LOGOUT } from "../constants/actionTypes";
import { logoutApi } from "../api/loginApi"

// Login success
// @params isSuperUser, userData
export const onLoginSuccess = (isSuperUser, userData) => ({
    type: LOGIN,
    payload: { isSuperUser, userData }
});

// Check login auth
// @params credantial { email, password }, history
export const onLogin = (credantial, history) => dispatch => {

    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(credantial)
    }
    
    fetch("/api/login", options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const { success, message, userName } = data;
            
            if(success) {
                NotificationManager.success(message, 'Login', 5000);
                dispatch(onLoginSuccess(success, userName));
                history.push("/");
            } else {
                NotificationManager.warning(message, 'Login', 5000);
            }
        });
}

// Logout
// @params history
export const onLogout = (history) => dispatch =>

    logoutApi().then(response => {
        const {
            meta: { code, message }
        } = response;
        if(code == 200) {
            NotificationManager.success(message, 'Logout', 5000);
            dispatch({
                type: LOGOUT,
                payload: { message }
            });
            history.push("/login");
        } else {
            NotificationManager.warning(message, 'Logout', 5000);
        }
    });
