import React, { useEffect, useState } from 'react';
import "./adminDashboard.css";
import AdminHeader from "../header/AdminHeader";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminDashboard = () => {
    const authorization = localStorage.getItem("authorization");
    const [productData, setProductData] = useState([]);

    const handleProductData = async () => {
        try {
            const res = await axios.post(`${baseUrl}/getProductsByUserId`, {}, {
                headers: {
                    authorization: authorization
                }
            });
            setProductData(res.data.data); // assuming response contains data array
            console.log("this is product data", res.data.data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        handleProductData();
        console.log("use effect worked ")
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <AdminHeader />
            <h2 className='text-align-center mt-5 mb-5'>Admin Dashboard</h2>
            <table className='Admin-dashboard-table' border={1}>
                <thead>
                    <tr>
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
                            <td>{el.name}</td>
                            <td>{el.description}</td>
                            <td>{el.price}</td>
                            <td>{el.stock}</td>
                            <td>{el.discount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;