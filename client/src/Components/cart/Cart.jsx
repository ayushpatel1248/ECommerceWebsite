import React from 'react';
import './cart.css';
// import Header from '../header/Header';
// import perfumeImg from '../../images/cart/perfume.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import imageof from '../../images/loginImg/login.svg'
import Header from '../header/Header'
const Cart = () => {
    return (
        <>
            <Header />
            <div className='cart-body'>
                <div className="shopping-cart">
                    <div className="title">
                        Shopping Bag
                    </div>

                    <div className="item">
                        <div className="image">
                            <img src={imageof} alt="" />
                        </div>



                        <div className="description">
                            <span>Common Projects</span>
                            <span>Bball High</span>
                            <span>White</span>
                        </div>

                        <div className="quantity">
                            <button className="minus-btn" type="button">
                                <RemoveIcon />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button className="plus-btn" type="button">
                                <AddIcon />
                            </button>
                        </div>

                        <div className="total-price">$549</div>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src={imageof} alt="" />
                        </div>



                        <div className="description">
                            <span>Common Projects</span>
                            <span>Bball High</span>
                            <span>White</span>
                        </div>

                        <div className="quantity">
                            <button className="minus-btn" type="button">
                                <RemoveIcon />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button className="plus-btn" type="button">
                                <AddIcon />
                            </button>
                        </div>

                        <div className="total-price">$549</div>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src={imageof} alt="" />
                        </div>



                        <div className="description">
                            <span>Common Projects</span>
                            <span>Bball High</span>
                            <span>White</span>
                        </div>

                        <div className="quantity">
                            <button className="minus-btn" type="button">
                                <RemoveIcon />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button className="plus-btn" type="button">
                                <AddIcon />
                            </button>
                        </div>

                        <div className="total-price">$549</div>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src={imageof} alt="" />
                        </div>



                        <div className="description">
                            <span>Common Projects</span>
                            <span>Bball High</span>
                            <span>White</span>
                        </div>

                        <div className="quantity">
                            <button className="minus-btn" type="button">
                                <RemoveIcon />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button className="plus-btn" type="button">
                                <AddIcon />
                            </button>
                        </div>

                        <div className="total-price">$549</div>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src={imageof} alt="" />
                        </div>



                        <div className="description">
                            <span>Common Projects</span>
                            <span>Bball High</span>
                            <span>White</span>
                        </div>

                        <div className="quantity">
                            <button className="minus-btn" type="button">
                                <RemoveIcon />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button className="plus-btn" type="button">
                                <AddIcon />
                            </button>
                        </div>

                        <div className="total-price">$549</div>

                    </div>

                    {/* Add more items here */}

                </div>

            </div>
            <div className="cart-footer">
                <div className="total-price">Total = $1234</div>
                <button class="button">
                    <span class="button-content">CHECKOUT </span>
                </button>

            </div>
        </>
    );
}



export default Cart;
