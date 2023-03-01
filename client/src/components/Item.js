import { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

class Item extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItem: PropTypes.func.isRequired,
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
        const { item } = this.props.item;
        const user = this.props.user;

        return (
            <div>
                <p>Hello</p>
                {this.props.isAuthenticated ? 
                <button 
                    className="add-to-cart"
                    size="sm"
                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                    >Add To Cart</button> :
                    null}
            </div>

        )}}


        const mapStateToProps = (state) => ({
            item: state.item,
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        })
        
        export default connect(mapStateToProps, {getItems, addToCart})(Item);