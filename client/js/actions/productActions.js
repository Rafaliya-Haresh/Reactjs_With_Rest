import "whatwg-fetch";
import { NotificationManager } from 'react-notifications';
import {
    CREACTE_PRODUCT,
    GET_ALL_PRODUCT,
    GET_PRODUCT_BY_ID,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    MESSAGE
} from "../constants/actionTypes";
import { productApi } from "../api/productApi"

// Create product
// @params product
export const createProduct = (product) => ({
    type: CREACTE_PRODUCT,
    payload: product
});

// All products
// @params products
export const allProduct = (products) => ({
    type: GET_ALL_PRODUCT,
    payload: products
});

// Update product
// @params product
export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
});

// Delete product
// @params product
export const deleteProduct = (_id) => ({
    type: DELETE_PRODUCT,
    payload: _id
});

// Get product by id
// @params product
export const productByID = (products) => ({
    type: GET_PRODUCT_BY_ID,
    payload: products
});

// Create/Add product
// @params product
export const onCreateProduct = (product) => dispatch =>
        productApi("POST", null, product)
            .then(response => {
                const {
                    meta: { code, message }
                } = response;
                if(code == 201) {
                    NotificationManager.success(message, 'Create Product', 5000);
                    const { data } = response;
                    dispatch(createProduct(data));
                } else {
                    NotificationManager.warning(message, 'Create Product', 5000);
                }
            });

// Get all products
export const getAllProduct = () => dispatch =>
        productApi("GET")
            .then(response => {
                const {
                    meta: { code, message }
                } = response;
                if(code == 200) {
                    NotificationManager.success(message, 'Products', 5000);
                    const { data } = response;
                    dispatch(allProduct(data));
                } else {
                    NotificationManager.warning(message, 'Products', 5000);
                }
            });

// Update product
// @params product, id
export const onUpdateProduct = (product, id) =>  dispatch =>
        productApi("PUT", id, product)
            .then(response => {
                const {
                    meta: { code, message }
                } = response;
                if(code == 200) {
                    NotificationManager.success(message, 'Update Product', 5000);
                    const { data } = response;
                    dispatch(updateProduct(data));
                } else {
                    NotificationManager.warning(message, 'Update Product', 5000);
                }
            });

// Get product by id
// @params id
export const getProductByID = (id) => {
    return dispatch =>
        productApi("GET", id)
            .then(response => {
                const {
                    meta: { code, message }
                } = response;
                if(code == 200) {
                    NotificationManager.success(message, 'Get Product', 5000);
                    const { data } = response;
                    dispatch(productByID(data));
                } else {
                    NotificationManager.warning(message, 'Update Product', 5000);
                }
            });
}

// Delete product
// @params id
export const onDeleteProduct = (id) => {
    return dispatch =>
        productApi("DELETE", id)
            .then(response => {
                const {
                    meta: { code, message }
                } = response;
                if(code == 200) {
                    NotificationManager.success(message, 'Delete Product', 5000);
                    dispatch(deleteProduct(id));
                } else {
                    NotificationManager.warning(message, 'Delete Product', 5000);
                }
            });
}
