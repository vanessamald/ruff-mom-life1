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
    render(){
        const handleClick = () => {
            console.log('HELLO WORLD')
          }

    return ( 
    <div className='categories-container'>
        <div className='category-container'>
            <div className="category-image-container">
                <img className='category-image' src={dogCategory}></img>
                <a href='/products' className='category-button'>Shop Now</a>
            </div>
            <div className='category-text-container'>
                <p className='category-subtext'>100% cotton handmade Bandanas</p>
                <h2 className="category-name">Shop All</h2>
            </div>
        </div>
        <div className='category-container'> 
            <div className="category-image-container">
                <img className='category-image' src={dogCategory}></img>
                <a href='' className='category-button'>Shop Now</a>
            </div>
            <div className='category-text-container'>
                <p className='category-subtext'>100% cotton handmade Bandanas</p>
                <h2 className="category-name">Dog Bandanas</h2>
            </div>
        </div>
        <div className='category-container'>
            <div className="category-image-container">
                <img className='category-image' src={fromme}></img>
                <a href='' className='category-button'>Shop Now</a>
            </div>
            <div className='category-text-container'> 
                <p className='category-subtext'>100% cotton T-shirts</p>
                <h2 className="category-name">T-Shirts</h2>
            </div>
        </div>
        <div className='category-container'>
            <div className="category-image-container">
                <img className='category-image' src={justBecause}></img>
                <a href='' className='category-button'>Shop Now</a>
            </div>
            <div className='category-text-container'>
                <p className='category-subtext'>Accessories</p>
                <h2 className="category-name">Just because</h2> 
            </div>
        </div>
    </div>   
)}}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getItems})(Category);