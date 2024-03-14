import React from 'react'
import AdminHeader from "../header/AdminHeader"
import "./addProduct.css"

const AddProduct = () => {
  return (
    <div className='main-parent-addproduct'>
      <AdminHeader />
      <div className='addProduct-parent'>
        <div className='sub-header-addproduct'>
          <ul className='decoration-none d-flex justify-content-between align-items-center' type="none">
            <li>Product Identity</li>
            <li>Price Detail</li>
            <li>Other Detail</li>
            <li>Confirm Detail</li>
          </ul>
        </div>

        <div className='product-identity-addproduct-parent'>
          <div className='product-identity-addproduct'>
            <div>
              <label htmlFor="product-image">Product Image</label>
              <input type="file" name='product-image' />
            </div>
            <div>
              <label htmlFor="ProductName">Product Name</label>
              <input name="ProductName" placeholder='Enter Your Product Name' type="text" />
            </div>
            <div>
              <label htmlFor="Description-addProduct">Description</label>
              <input name="Description-addProduct" placeholder='Enter Product Description' type="text" />
            </div>
            <div>
              <label htmlFor="brand">Brand Name</label>
              <input name="brand" placeholder='Enter Your Brand Name' type="text" />
            </div>
          </div>

        </div>
        <div className='addProduct-footer'>
          <button class="continue-button-addProduct" >
            <span>Go Back</span>
          </button>
          <button class="continue-button-addProduct" >
            <span>Continue</span>
            <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
              <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddProduct;