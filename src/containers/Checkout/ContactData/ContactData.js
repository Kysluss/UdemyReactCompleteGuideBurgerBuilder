import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '', 
        email: '', 
        address: {
            street: '', 
            postalCode: ''
        }, 
        loading: false 
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        console.log(this.props.ingredients);

        this.setState({ loading: true });

        const order = {
            indredients: this.state.ingredients, 
            price: this.state.totalPrice, 
            customer: {
                name: 'Kyle Slusser', 
                address: {
                    street: 'Street Road 1', 
                    zipCode: '12345', 
                    country: 'Germany'
                }, 
                email: 'test@test.com'
            }, 
            deliveryMethod: 'fastest'
        }
        // The .json extension is firebase specific
        // We need it for firebase to understand our request
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your EMail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;