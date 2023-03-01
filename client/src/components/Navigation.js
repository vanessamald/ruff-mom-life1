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
import { RiShoppingCartLine } from "react-icons/ri";

function Navigation({ name, ...props }) {
      
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
        const [ button, setButton] = useState("menu-btn");

        useEffect(() => {
            const html = document.getElementsByTagName('html')[0]
          
            if (setStyle === "open-menu") {
              html.classList.add('lock-sreen')
            } else {
              html.classList.remove('lock-screen')
            }
          });

          const changeButton = () => {
            if (button) {
            setButton("change");
            setStyle("open-menu");
            const html = document.getElementsByTagName('html')[0]
            html.classList.add('lock-sreen');
            }
            if (button === "change") {
            setButton("menu-btn");
            setStyle("hidden-menu");
            }
        };

    return (
        <>
        <div>
            <div className="nav-container">
                <div className="title-container">
                    <a href="/" className='title'>Ruff Mom Life</a>
                </div>
                <div className={button} onClick={changeButton}>
                    <span className='menu-span1'></span>
                    <span className='menu-span2'></span>
                    <span className='menu-span3'></span>
                </div>
                <a className="" href="/cart"><RiShoppingCartLine className='menu-cart-icon'/></a>
                {/* 
                <a className="" href="/cart"><RiShoppingCartLine className='menu-cart-icon'/></a>
                */}
            </div>
            <div className={style} >
                
                <div className='menu-btns-container'>
                <RegisterModal />
                {isAuthenticated ? (
                <Logout />
                ) : (
                <LoginModal/> 
                )}
                
                </div>
                
                <p className="user-links welcome-text">{ user ? `Welcome ${user.name}!` : ''}</p>
                <a href="/products">Shop All</a>
                <a className="" href="#about">About</a>
                <a className="" href="#contact">Contact</a>
                <a className="" href="/orders">Orders</a>
            </div>
        </div>
    </>
)}
     
    const mapStateToProps = state => ({
        auth: state.auth
    })
    
export default connect(mapStateToProps, null)(Navigation);