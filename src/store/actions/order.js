import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS, 
        orderId: id, 
        orderData, orderData 
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL, 
        error: error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return (dispatch) => {
        // The .json extension is firebase specific
        // We need it for firebase to understand our request
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}