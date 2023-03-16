import { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';
import { ImHappy } from "react-icons/im";

class Products extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    static propTypes = {
        getItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        //user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    render(){
        const { items } = this.props.item;
        const user = this.props.user;
    
    //const [ icon, setIcon ] = useState();

        {/*const handleMouse = e => {
            e.target.style.cursor = "url(images/cart-solid.svg), pointer"
        }*/}

        return (
            
            <div className="shop-all-container" id='shop'>
            <h2 className="shop-all-link">Collection</h2>
            <div>
            
                <div className="products-container">  
                 
                {items.map((item)=>(
                    
                    <div className="product-card">
                        <div className='product-content'>
                            
                            <button className='product-link' onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                //onMouseEnter={handleMouse}
                            >
                                <img className="products-image" variant="top" src={`/images/${item.image}`} ></img>
                            </button>
                            
                            
                            {this.props.isAuthenticated ? 
                            
                            <button 
                                className="add-to-cart"
                                size="sm"
                                onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                >Add To Cart</button> :
                                null}
                            
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardSubtitle tag="h6">Price: $ {item.price}</CardSubtitle>
                            {/*<CardText>{item.category}</CardText> */}
                          
                                    
                        </div>
                    </div>
                   
                    
                ))}
                
                 </div>
            </div>
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