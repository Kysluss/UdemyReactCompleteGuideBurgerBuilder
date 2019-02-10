import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    // This allows you to run 2 requests simultaneously
    // It's the same as yielding after each thing
    // Because these are synchronous tasks, there really isn't any benefits
    // If you run multiple AJAX requests, this would benefit you
    all(
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    );
    //yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    //yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    //yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    //yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    // takeLatest will cancel any currently running tasks of that type (PURCHASE_BURGER)
    // For example, if the user double clicks the purchase button before it is hidden/disabled, we don't want to double order the burger
    // Using this will ensure that only the latest execution is the one that runs
    // 
    // Basically ensures that this will only run once at any given time
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}