import { Component } from 'react';
import AppNavbar from './Navbar';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

import Products from './Products';
import heroImage from '../images2/dog1.jpg'
import About from './About';
import Contact from './Contact';

class Home extends Component {

   
    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    render(){
        const { items } = this.props.item;
        const user = this.props.user;

        return (
            <div>
            <AppNavbar/>
                <div className="flex-container">
                    <div className="home-text-container">
                    <p className="home-text">Pets are family</p>
                    <p className="home-text subtext">Handmade pet accessories made with love</p>
                    </div>
                    <img className="hero-image" src={heroImage}></img>
                </div>
                <About/>
            <Products/>
            <Contact/>
            </div>
    )}
}

const mapStateToProps = (state) => ({
    
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home);