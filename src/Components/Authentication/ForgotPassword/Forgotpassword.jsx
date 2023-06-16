import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'


export default function Forgotpassword({saveUserData}) {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),


})
let formik=useFormik({
    initialValues:{
        email:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleForgotpassword(values)
    }
})

async function handleForgotpassword(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.statusMsg=="success")
    {
        setLoading(false)
        toast.success(`${data.message}`,
        {
        duration: 5000 ,
        position: 'top-center',
        className: ' bg-info  text-center text-white'
        })
        navigateTo('/VerifyResetCode')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Forgot password</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>Enter Your Email to send  Reset Code  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
  
    <br />
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Send Code</button>}

    

    </form>
  </div>
  </>
}
