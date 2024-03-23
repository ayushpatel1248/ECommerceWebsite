import React from 'react'
import { useEffect, useState } from 'react';
import "./stockEditAdmin.css";
import AdminHeader from "../header/AdminHeader";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loader from '../Loader'
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const baseUrl = process.env.REACT_APP_BASE_URL;

const StockEditAdmin = () => {
    const authorization = localStorage.getItem("authorization");
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const notify = (notifyMessage) => toast(notifyMessage);

    const handleProductData = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${baseUrl}/getProductsByUserId`, {}, {
                headers: {
                    authorization: authorization
                }
            });
            setProductData(res.data.data); 
            console.log("this is product data", res.data.data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
        finally {
            setIsLoading(false)
        }
    };


    const handleStockUpdate = async (editNo, productid) => {
        try {
            console.log(editNo , productid)
            const res = await axios.post(`${baseUrl}/productStockEdit`, { productid, editNo }, { headers: { authorization } })
            notify(res.data.mess)
        }
        catch (err) {
            notify(err.message) 
            console.log("some error occured", err)
        }

    }

    useEffect(() => {
        handleProductData();
        console.log("use effect worked ")
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <AdminHeader />
            <h2 className='text-align-center mt-5 mb-5'>Stock Edit</h2>
            {isLoading ? <Loader /> :
                <table className='Admin-dashboard-table' border={1}>
                    <thead>
                        <tr>
                            <th className='text-align-center'>S.No</th>
                            <th className='text-align-center'>Product Name</th>
                            <th className='text-align-center'>Price</th>
                            <th className='text-align-center'>Volume</th>
                            <th className='text-align-center'>Stock</th>
                            <th className='text-align-center'>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(productData) && productData.map((el, index) => (
                            <tr key={index}>
                                <td className='text-align-center'>{index + 1}</td>
                                <td className='text-align-center'>{el.name}</td>
                                <td className='text-align-center'>{el.price}</td>
                                <td className='text-align-center'>{el.volume} ml</td>
                                <td className='text-align-center'><button className='button-invisible' onClick={() => handleStockUpdate("-1", el._id)}><RemoveIcon /></button><span className='me-3 ms-3'>{el.stock}</span><button className='button-invisible' onClick={() => handleStockUpdate("1", el._id)}><AddIcon /></button></td>
                                <td className='text-align-center'><button className='button-invisible' onClick={() => handleStockUpdate("0", el._id)}><DeleteIcon /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <ToastContainer />
        </div>
    )
}

export default StockEditAdmin