import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //ingredients is an object of key:value of the ingredient: #ToUse
    //Example:
    //ingredients: {
    //     salad: 1, 
    //     bacon: 1, 
    //     cheese: 2, 
    //     meat: 2
    // }
    //Object.keys generates a string[] of the keys
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //Create a new array of the lengh specified in the ingredients
            return [...Array(props.ingredients[igKey])].map((__dirname, i) => {
                //Create the ingredient type in the array
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;