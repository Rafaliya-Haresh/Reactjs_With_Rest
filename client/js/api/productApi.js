import "whatwg-fetch";

// Product common api
export const productApi = (method = "GET", id = null, body = null) => {
    let url = "https://sonolife2.beautitag.com/v1/productLines";
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: method
    }

    if(window.token) {
        options.headers.Authorization = `Bearer ${window.token}`;
    }
    if(body != null) {
        options.body = JSON.stringify(body);
    }
    if(id != null) {
        url += `/${id}`;
    }
    return fetch(url, options)
        .then(response => response.json());
}
