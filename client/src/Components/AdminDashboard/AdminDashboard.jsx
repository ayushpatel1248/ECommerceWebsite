import React, { useEffect, useState } from 'react';
import "./adminDashboard.css";
import AdminHeader from "../header/AdminHeader";
import axios from 'axios';
import Loader from '../Loader'
import UserNotLogin from '../useNotLogin/UserNotLogin';

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminDashboard = () => {
    const authorization = localStorage.getItem("authorization");
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isUserLogin, setIsUserLogin] = useState(false)


    useEffect(() => {
        if (!authorization) {
            setIsUserLogin(true)
        }
    }, []);
    
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

    useEffect(() => {
        handleProductData();
        console.log("use effect worked ")
    }, []);

    return (
        <div>
            <AdminHeader />
            {isUserLogin? <UserNotLogin/> : <div>
           <h2 className='text-align-center mt-5 mb-5'>Admin Dashboard</h2>
           {isLoading ? <Loader /> :
                <table className='Admin-dashboard-table' border={1}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(productData) && productData.map((el, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.description}</td>
                                <td>{el.price}</td>
                                <td>{el.stock}</td>
                                <td>{el.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
           </div>}
           
        </div>
    );
};

export default AdminDashboard;