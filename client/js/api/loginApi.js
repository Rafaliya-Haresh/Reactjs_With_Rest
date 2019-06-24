import "whatwg-fetch";

// Logout api
export const logoutApi = () => {
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }
    const url = 'https://sonolife2.beautitag.com/v1/auth/logout';
    return fetch(url, options).then(response => response.json());
}
