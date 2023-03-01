import { Component, Fragment } from 'react';
import AppNavbar from './Navbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, deleteFromCart } from '../actions/cartActions';
import Checkout from './Checkout';
import { checkout } from '../actions/orderActions';
import Navigation from './Navigation';
import Login from './auth/login';

class Cart extends Component {

    state = {
        loaded: false,
    }

    static propTypes = {
        getCart: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        deleteFromCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        cart: PropTypes.object.isRequired,
        checkout: PropTypes.func.isRequired
    }

    getCartItems = async (id) => {
        await this.props.getCart(id);
        this.state.loaded = true;
    }

    onDeleteFromCart = (id, itemId) => {
        this.props.deleteFromCart(id, itemId);
    } 
    
    render(){
        const user = this.props.user;
        if(this.props.isAuthenticated && !this.props.cart.loading && !this.state.loaded){
            this.getCartItems(user._id);
        }
        return(
            <div >
                <Navigation/>
                {this.props.isAuthenticated ?
                    <Fragment>
                        {this.props.cart.cart ? null :
                            <Alert color="info" className="text-center">Your cart is empty!</Alert>
                        }
                    </Fragment>
                    : <div className='cart-login-container'>
                        <p className="text-center cart-login-alert">Login Below to View!</p>
                        <Login/>
                    </div>
                    
                }  
        
            
                {this.props.isAuthenticated && !this.props.cart.loading && this.state.loaded && this.props.cart.cart?
                <Container >
                    <div className="row">
                        {this.props.cart.cart.items.map((item)=>(
                            <div className="col-md-4">
                        <div className='card-container'>
                            <CardBody>
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle tag="h6">Price: ${item.price}</CardSubtitle>
                                <CardText>Quantity: {item.quantity}</CardText>
                                <button  onClick={this.onDeleteFromCart.bind(this, user._id, item.productId)}>Delete</button>
                            </CardBody>
                        </div>
                        <br/>
                        </div>
                        ))}
                        <div class="col-md-12">
                        <div className='card-container'>
                            <CardBody className='checkout'>
                                <CardTitle tag="h5">Total Cost =  {this.props.cart.cart.bill}</CardTitle>
                                <form action="/create-checkout-session" method="POST">
                                <button
                                    type="submit"
                                    id="checkout-button"
                                    className='cart-button'
                                    user={user._id}
                                    amount={this.props.cart.cart.bill}
                                    checkout={this.props.checkout}
                                > Checkout</button>
                                </form>                  
                            </CardBody>
                        </div>
                        </div>
                    </div>
                </Container>
                    :null}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, {getCart, deleteFromCart, checkout})(Cart);