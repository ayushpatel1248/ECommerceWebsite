import React, { useEffect, useState } from 'react'
import AdminHeader from "../header/AdminHeader"
import "./addProduct.css"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const baseUrl = process.env.REACT_APP_BASE_URL


const AddProduct = () => {
  var authorization = localStorage.getItem("authorization")
  const [toggle, setToggle] = useState(1);
  const [description, setDescription] = useState("")
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [stock, setStock] = useState()
  const [volume, setVolume] = useState()
  const [gender, setGender] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [images, setImages] = useState()
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const notify = (notifyMessage) => toast(notifyMessage);


  const handleAddProduct = async () => {
    const data = {
      name,
      description,
      brand,
      price,
      discount,
      stock,
      volume,
      gender,
      thumbnail,
      images,
      ingredients
    }
    console.log(data)
    try{
    setIsLoading(true)
    const res = await axios.post(`${baseUrl}/addProduct`, data, {headers:{authorization}})
    console.log("product added successs fully", res)
    notify(res.data.msg)
    }
    catch(err){
      console.log("some error occured")
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      console.log('Image URL:', imageUrl);
      setImages([imageUrl]);
    };

    reader.readAsDataURL(file);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      console.log('Thumbnail URL:', imageUrl, typeof (imageUrl));
      setThumbnail(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  console.log(toggle)

  return (
    <div className='main-parent-addproduct'>
      <AdminHeader />
      <div className='addProduct-parent'>
        <div className='sub-header-addproduct'>
          <ul className='decoration-none d-flex justify-content-between align-items-center ul-addproduct' type="none">
            <li className={toggle == 1 ? "border-bottom-purple text-align-center" : "text-align-center"} onClick={(e) => setToggle(1)}>Product Identity</li>
            <li className={toggle == 2 ? "border-bottom-purple text-align-center" : "text-align-center"} onClick={(e) => setToggle(2)}>Price Detail</li>
            <li className={toggle == 3 ? "border-bottom-purple text-align-center" : "text-align-center"} onClick={(e) => setToggle(3)}>Other Detail</li>
            <li className='text-align-center'>Confirm Detail</li>
          </ul>
        </div>

        {toggle == 1 ?
          <div>
            <div className='product-identity-addproduct-parent'>
              <div className='product-identity-addproduct'>
                <div>
                  <label htmlFor="product-image">Product Image</label>
                  <input type="file" name='product-image' onChange={handleImageUpload} />
                </div>
                <div>
                  <label htmlFor="ProductName">Product Name</label>
                  <input value={name} name="ProductName" placeholder='Enter Your Product Name' type="text" onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="Description-addProduct">Description</label>
                  <input value={description} name="Description-addProduct" placeholder='Enter Product Description' type="text" onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="brand">Brand Name</label>
                  <input name="brand" value={brand} placeholder='Enter Your Brand Name' type="text" onChange={e => setBrand(e.target.value)} />
                </div>
              </div>

            </div>
            <div className='addProduct-footer'>
              <button class="continue-button-addProduct" >
                <span>Go Back</span>
              </button>
              <button class="continue-button-addProduct" onClick={(e) => { setToggle(toggle + 1) }} >
                <span >Continue</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                  <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </button>
            </div>
          </div> :


          toggle == 2 ?
            <div>
              <div className='product-identity-addproduct-parent'>
                <div className='product-identity-addproduct'>
                  <div>
                    <label htmlFor="product-price">Product Price</label>
                    <input type="number" value={price} name='product-price' placeholder='Enter Price Of Product' onChange={e => setPrice(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="productDiscount">Product Discount</label>
                    <input name="productDiscount" value={discount} placeholder='Enter Your Price Discount' type="number" onChange={e => setDiscount(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="stock">Stock</label>
                    <input name="stock" placeholder='Enter Product stock' value={stock} type="number" onChange={e => setStock(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="volume">Enter Volume</label>
                    <input name="volume" placeholder='Enter Volume Of Product' type="number" value={volume} onChange={e => setVolume(e.target.value)} />
                  </div>
                </div>

              </div>
              <div className='addProduct-footer'>
                <button class="continue-button-addProduct" onClick={(e) => { setToggle(toggle - 1) }} >
                  <span>Go Back</span>
                </button>
                <button class="continue-button-addProduct" onClick={(e) => { setToggle(toggle + 1) }} >
                  <span >Continue</span>
                  <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                  </svg>
                </button>
              </div>
            </div> :

            <div>
              <div className='product-identity-addproduct-parent'>
                <div className='product-identity-addproduct'>
                  <div>
                    <label htmlFor="thumbnail">Product thumbnail</label>
                    <input type="file" name='thumbnail' onChange={handleThumbnailUpload} />
                  </div>
                  <div>
                    <label htmlFor="Gender">Product Gender</label>
                    <input name="Gender" value={gender} placeholder='Enter Product Gender' type="text" onChange={e => setGender(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="Ingredients">Product Ingredients</label>
                    <input name="Ingredients" value={ingredients} placeholder='Enter Product Ingredients' type="text" onChange={e => setIngredients([e.target.value])} />
                  </div>
                </div>

              </div>
              <div className='addProduct-footer'>
                <button class="continue-button-addProduct" onClick={(e) => { setToggle(toggle - 1) }} >
                  <span>Go Back</span>
                </button>
                <button class="continue-button-addProduct" disabled={isLoading} onClick={handleAddProduct} >
                  <span >Add Product</span>
                  <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                  </svg>
                </button>
              </div>
            </div>
        }


        {console.log(name, images, thumbnail)}
        <ToastContainer />
      </div>
    </div>
  )
}

export default AddProduct;