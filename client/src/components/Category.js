import React, { useEffect, useState } from 'react';
import dogCategory from '../images2/imagejpeg_3 2.JPG';

function Category() {
    return (
    <div className='category-container'>
        
        <div className='category-text'>
            <h2>Dog Bandanas</h2>
            <p>100% cotton handmade Bandanas</p>
            <button className='shopnow-button'>Shop now</button>
        </div>

        <img src={dogCategory}></img>
    </div>
)}

export default Category;