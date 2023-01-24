import React, { useEffect, useState } from 'react';
import { Component, Fragment } from 'react';
import { Collapse, NavbarToggler, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import RegisterModal from './auth/register';
import Logout from './auth/logout';
import LoginModal from './auth/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';


import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation({ name, ...props }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        const guestLinks = (
            
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );
        
        const { isAuthenticated, user } = props.auth;
        const [style, setStyle] = useState("hidden-menu");
    
        const changeStyle = () => {
            console.log("you just clicked");
            setStyle("menu-content");
        };

        const closeMenu = () => {
            setStyle("hidden-menu");
        }

    return (
        <>
    <div>
    <div className="nav-container">
        <div className="title-container">
            <a href="/" className='title'>Ruff</a>
            <a href="/" className='title'>Mom</a>
            <a href="/" className='title'>Life</a>
        </div>
        <button className="menu-btn" onClick={changeStyle}>
            Menu
        </button>
    </div>
        <div className={style} >

                <RegisterModal />
                    {isAuthenticated ? (
                    <Logout />
                    ) : (
                    <LoginModal/> 
                    )}
       
                <p className="user-links welcome-text">{ user ? `Welcome ${user.name}!` : ''}</p>
    
                <a className="" href="/">Shop</a>
                <a className="" here="/">Menu item</a>
                <a className="" href="/">Menu item</a>
                <a className="" href="/orders">Orders</a>
                <a className="" href="/cart">Cart</a>
               
                <a className="user-links menu-close"
                    onClick={closeMenu}>
                    Close
                </a> 
               </div>
        </div>
    </>
    )}
     
    const mapStateToProps = state => ({
        auth: state.auth
    })
    
export default connect(mapStateToProps, null)(Navigation);