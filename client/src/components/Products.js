import { Component } from 'react';
import AppNavbar from './Navbar';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import Dropdown from 'react-bootstrap/Dropdown';

class Products extends Component {

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
            <h2 className="shop-all-link">Shop All</h2>
            <Container>
            
                <div className="row">  
                 
                {items.map((item)=>(
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            
                            <CardImg variant="top" src={`/images/${item.image}`} ></CardImg>
                            <CardSubtitle tag="h6">Price: $ {item.price}</CardSubtitle>
                            <CardText>{item.category}</CardText>
                            {this.props.isAuthenticated ? 
                            
                                <button 
                                    className="add-to-cart"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                    >Add To Cart</button> :
                                    null}
                                    
                        </CardBody>
                    </Card>
                    </div>
                    
                ))}
                
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Products);