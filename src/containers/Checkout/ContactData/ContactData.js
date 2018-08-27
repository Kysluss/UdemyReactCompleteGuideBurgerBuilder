import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Your name'
                }, 
                value: '', 
                validation: {
                    required: true
                }, 
                valid: false, 
                touched: false
            }, 
            street: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Street'
                }, 
                value: '', 
                validation: {
                    required: true
                }, 
                valid: false, 
                touched: false
            }, 
            zipCode: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text', 
                    placeholder: 'ZIP Code'
                }, 
                value: '', 
                validation: {
                    required: true, 
                    minLength: 5, 
                    maxLength: 5
                }, 
                valid: false, 
                touched: false
            }, 
            country: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Country'
                }, 
                value: '', 
                validation: {
                    required: true
                }, 
                valid: false, 
                touched: false
            }, 
            email: {
                elementType: 'email', 
                elementConfig: {
                    type: 'text', 
                    placeholder: 'Your E-Mail'
                }, 
                value: '', 
                validation: {
                    required: true
                }, 
                valid: false, 
                touched: false
            }, 
            deliveryMethod: {
                elementType: 'select', 
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'}, 
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                }, 
                value: 'fastest', 
                validation: {}, 
                valid: true
            }
        }, 
        loading: false, 
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings, 
            price: this.props.price, 
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;

        // If no rules are set up, short circuit
        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // {...this.state.orderForm} does not perform a deep clone
        const updatedOrderForm = {...this.state.orderForm};

        // We need to spread the object within the object
        // This will properly create a copy of this.state.orderForm[keyName]
        // If we wanted to updated elementConfig, we would also need to clone updatedFormElement.elementConfig
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm, 
            formIsValid: formIsValid
        });
    }
    
    render() {
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid} 
                        shouldValidate={formElement.config.validation} 
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients, 
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));