import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null, 
    totalPrice: 4, 
    error: false, 
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5, 
    cheese: 0.4, 
    meat: 1.3, 
    bacon: 0.7 
};

const updateIngredientAmount = (state, name, amount) => {
    const updatedIngredient = {[name]: state.ingredients[name] + amount}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[name], 
        building: true
    }
    return updateObject(state, updatedState);
}

const addIngredient = (state, action) => {
    return updateIngredientAmount(state, action.ingredientName, 1);
}

const removeIngredient = (state, action) => {
    return updateIngredientAmount(state, action.ingredientName, -1);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad, 
            bacon: action.ingredients.bacon, 
            cheese: action.ingredients.cheese, 
            meat: action.ingredients.salad
        }, 
        totalPrice: 4, 
        error: false, 
        building: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;