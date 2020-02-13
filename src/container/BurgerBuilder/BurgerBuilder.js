import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxil/Auxil';
import Burger from '../../component/Burger/Burger';
import BurgerControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actionTypes from '../../store/action';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount = () => {
        // axiosInstance.get('https://react-burger-tutorial-266014.firebaseio.com/Ingredients.json')
        //     .then((response) => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch((error) => this.setState({ error: true }));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((num, el) => num + el, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Spinner loading while we fetch the data from the server
        let orderSummary = null;
        let ingredients = this.state.error ? <p>Presently unable to load ingredients</p> : <Spinner />
        if (this.props.ings) {
            ingredients = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                totalPrice={this.props.price}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {ingredients}
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));