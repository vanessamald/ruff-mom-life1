import React, { useEffect, useState } from 'react';
import aboutImage from '../images2/about-image.JPG';

function About() {
    return (
    <div id='about' className='about-container'>
        
        
        <div className="about-text-container"> 
        <h2 className="about-title">Our Story</h2>
        <p className="about-text">Hello there! Our pieces are thoughtfully made and curated for dog lovers and their owners.</p>

        
        </div>
        <img className="about-image" src={aboutImage}></img>
    </div>
)}

export default About;