import React, { useEffect, useState } from 'react';
import { Component, Fragment } from 'react';
import { Collapse, NavbarToggler, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import RegisterModal from './auth/register';
import Logout from './auth/logout';
import LoginModal from './auth/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Modal } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

        return (
          <>
        <div className="nav-container">
          <a href="/" className='title'>Ruff Mom Life</a>
            <button onClick={handleShow} className='menu-btn'
            >Menu
            </button>
        </div>
            <Modal className="menu-modal" show={show} onHide={handleClose}
            
            style={{
                width: "50%",
                marginLeft: "50%",
                outline: "none"
            }} >
                {isAuthenticated ? (
                <Logout/>
                    ) : (
                <LoginModal/> 
            )}
                
                <NavItem>
                    
                        <p className="welcome-text">{ user ? `Welcome ${user.name}!` : ''}</p>
                    
                   

                    <Dropdown>
                        <Dropdown.Toggle >
                            Shop
                        </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Shop All</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Bandanas</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">T-Shirts</Dropdown.Item>
                                <Dropdown.Item href="#/action-4">Accessories</Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown>




                    <NavLink href="/cart">Cart</NavLink>
                    
                
                    <NavLink href="/orders">Orders</NavLink>
                
                   
                </NavItem>
                <button className="close-button"
                    onClick={handleClose}>
                    Close
                </button>
                   
            </Modal>
          </>
        );
      }
     
    const mapStateToProps = state => ({
        auth: state.auth
    })
    
export default connect(mapStateToProps, null)(Navigation);