import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'


export default function ResetPassword() {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    newPassword:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),


})
let formik=useFormik({
    initialValues:{
        email:"",
        newPassword:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleResetPassword(values)
    }
})

async function handleResetPassword(values)
{
    setLoading(true)
    let {data}=await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.token!=null)
    {
        setLoading(false)
        toast.success(`Your password  updated`,
        {
        duration: 5000 ,
        position: 'top-center',
        className: ' bg-main text-center text-white'
        })
        navigateTo('/login')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Reset code</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>Update Your password :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* password */}
    <label htmlFor="newPassword" className='mb-2'>new Password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' className='form-control pb-2' />
    {formik.errors.newPassword&&formik.touched.newPassword?<div className='alert alert-danger'>{formik.errors.newPassword}</div>:null}
    <br />
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Update password</button>}

    

    </form>
  </div>
  </>
}
