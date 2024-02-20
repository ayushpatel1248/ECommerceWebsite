import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setAddressValue } from '../../../store/slices/profileUpdattionSlice';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const AddressUpdate = () => {
  const notify = (mes) => toast.error(mes);
  const notifySucess = (mes) => toast(mes);
    const dispatch = useDispatch();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const addressSchema = Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string()
        .required('State is required')
        .matches(/^[A-Z]{2}$/, 'State must be a two-letter abbreviation'),
      postalCode: Yup.string()
        .required('Postal code is required')
        .matches(/^\d{5}$/, 'Postal code must be 5 digits'),
    });
    const handelAddressUpdateSubmit = async ()=>{
try{
  await addressSchema.validate({ street , city , state , postalCode })
  const auth = localStorage.getItem("authorization")

  axios.post(`${BASE_URL}/user/updateUserAddress`, { street , city , state , postalCode , role: "user" }, { headers: { authorization: auth } }).then((res) => {
    if (res.data.status == "OK") {
      console.log("res.data=>", res.data)
      notifySucess(res.data.msg)
      dispatch(setAddressValue(false))
      window.location.reload();

    } else {
      console.log(res.data)
      notify(res.data.msg)
    }
  }).catch((err) => {
    console.log("error in axios at  UpdateEmail.jsx", err)
    notify("network error")
  })

}catch(err){
  notify(err.message)
}
    }
  return (
    <div className='update-email-div'>
    <div className='update-email-inner-div'>
      <div className='d-flex justify-content-center flex-column gap-5'>
       <div>
       <h1 className='text-center fw-bold'><i class="fa fa-map-marker" aria-hidden="true"></i></h1>
        <h2 className='text-center fw-bold'>Update Address</h2>
       </div>

        <div className="form-update-email">
          <input className="input-update-email"onChange={(e) => { setStreet(e.target.value) }}  placeholder="Enter Street" type="text"></input>
          <input className="input-update-email"onChange={(e) => { setCity(e.target.value) }}  placeholder="Enter City" type="text"></input>
          <input className="input-update-email"onChange={(e) => { setState(e.target.value) }}  placeholder="Enter State" type="text"></input>
          <input className="input-update-email"onChange={(e) => { setPostalCode(e.target.value) }}  placeholder="Enter Postal Code" type="text"></input>
          <span className="input-border-update-email"></span>
        </div>

       <div className='d-flex gap-3'>
      <button  className='button-update-email' onClick={()=>{dispatch(setAddressValue(false))}}>cancle</button>
        <button className='button-update-email'onClick={handelAddressUpdateSubmit}>Save Changes</button>
       </div>
      </div>
    </div>
    <ToastContainer position="bottom-center" />
  </div>
  )
}

export default AddressUpdate
