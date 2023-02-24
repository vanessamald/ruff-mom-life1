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
    /*
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        */
      
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
            setStyle("open-menu");
            const html = document.getElementsByTagName('html')[0]
            html.classList.add('lock-sreen');
        };

        const closeMenu = () => {
            setStyle("hidden-menu");
        }

        useEffect(() => {
            const html = document.getElementsByTagName('html')[0]
          
            if (setStyle === "open-menu") {
              html.classList.add('lock-sreen')
            } else {
              html.classList.remove('lock-screen')
            }
           
          });

    return (
        <>
        <div>
            <div className="nav-container">
                <div className="title-container">
                    <a href="/" className='title'>Ruff Mom Life</a>
                </div>
                <button className="menu-btn" onClick={changeStyle}>
                Menu
                </button>
            </div>
            <div className={style} >
                <div className='menu-btns-container'>
                <RegisterModal />
                {isAuthenticated ? (
                <Logout />
                ) : (
                <LoginModal/> 
                )}
                <a className="menu-close" onClick={closeMenu}>Close</a>
                </div>
                <p className="user-links welcome-text">{ user ? `Welcome ${user.name}!` : ''}</p>
                <a className="" href="/">Shop</a>
                <a className="" here="/">Menu item</a>
                <a className="" href="/">Menu item</a>
                <a className="" href="/orders">Orders</a>
                <a className="" href="/cart">Cart</a>
            </div>
        </div>
    </>
)}
     
    const mapStateToProps = state => ({
        auth: state.auth
    })
    
export default connect(mapStateToProps, null)(Navigation);