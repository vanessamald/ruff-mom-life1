import React, { useEffect, useState } from 'react';
import contactImage from '../images2/contact-image.jpg';

function Contact() {
    return (
    <div className='contact-container'>
        <div className="contact-image-container">
        <img className="contact-image" src={contactImage}></img>
        </div>
        
        <div className="contact-text-container"> 
        <h2 className='contact-subtitle'>Ruff Mom Life</h2>
        <h2 className="contact-title" >Get In Touch</h2>
        <p className="contact-text">Email address</p>
        <p className='contact-text'>hello@awesome.com</p>
        </div>

        
    </div>
)}

export default Contact;