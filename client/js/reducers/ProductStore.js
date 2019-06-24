import { 
    CREACTE_PRODUCT,
    GET_ALL_PRODUCT,
    GET_PRODUCT_BY_ID,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
} from "../constants/actionTypes";

// Initial state data
const initialState = {
    products: [],
    message: ''
};

// Product store
const ProductStore = (state = initialState, action) => {
    switch(action.type) {

        case CREACTE_PRODUCT:
            return Object.assign({}, state, {
                products: state.products.concat(action.payload.product_line)
            });

        case GET_ALL_PRODUCT:
            return Object.assign({}, state, {
                products: action.payload.product_lines
            });

        case GET_PRODUCT_BY_ID:
            return Object.assign({}, state, {
                products: [action.payload.product_line]
            });

        case UPDATE_PRODUCT:
             console.log(action.payload.product_line);
            const updatedProduct = state.products.map(product => {
                if(product._id === action.payload.product_line._id) {
                    return action.payload.product_line;
                } else {
                    return product;
                }
            });
            return Object.assign({}, state, {
                products: updatedProduct
            });

        case DELETE_PRODUCT:
            const removedProduct = state.products.filter(product => product._id !== action.payload );
            return Object.assign({}, state, {
                products: removedProduct
            });

        default:
            return state;
    }
}

export default ProductStore;
