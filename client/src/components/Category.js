import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import dogCategory from '../images2/dogbandanas.JPG';
import justBecause from '../images2/accessories.JPG'
import fromme from '../images2/fromme.JPG';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

import Carousel from 'react-bootstrap/Carousel';

class Category extends Component {

//function Category(items) {
    
    render(){
       
    return ( 
<Carousel>
<Carousel.Item>

<div className='category-container'>

        <div className='category-text-container'>
            
            <h2 className="category-name">Dog Bandanas</h2>
            <p>100% cotton handmade Bandanas</p>
            <button className='shopnow-button'>Shop now</button>
        </div>
        <div className="category-image-container">
        <img className='category-image' src={dogCategory}></img>
        </div>
    </div>

</Carousel.Item>
<Carousel.Item>
    
<div className='category-container'>

        <div className='category-text-container'>
            
            <h2 className="category-name">From me to me</h2>
            <p>100% cotton T-shirts</p>
            <button className='shopnow-button'>Shop now</button>
        </div>
        <div className="category-image-container">
        <img className='category-image' src={fromme}></img>
        </div>
    </div>

</Carousel.Item>
<Carousel.Item>
    
<div className='category-container'>

        <div className='category-text-container'>
            
            <h2 className="category-name">Just because</h2>
            <p>Accessories</p>
            <button className='shopnow-button'>Shop now</button>
        </div>
        <div className="category-image-container">
        <img className='category-image' src={justBecause}></img>
        </div>
    </div>
   
</Carousel.Item>
</Carousel>
    
)}}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems})(Category);