import React from 'react'
import "./adminDashboard.css"
import AdminHeader from "../header/AdminHeader"

const AdminDashboard = () => {
  return (
    <div>
        <AdminHeader />
        <h2 className='text-align-center mt-5 mb-5'>Admin Dashboard</h2>
        <table className='Admin-dashboard-table' border={1}>
            <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Discount</th>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Stock</td>
                <td>discount</td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Stock</td>
                <td>discount </td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Stock</td>
                <td>discount</td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Stock</td>
                <td>discount</td>
            </tr>
        </table>
    </div>
  )
}

export default AdminDashboard