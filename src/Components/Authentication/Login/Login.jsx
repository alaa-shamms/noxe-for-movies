import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'
import { toast } from 'react-hot-toast'

export default function Login({saveUserData,userData}) {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),


})
let formik=useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleLogin(values)
    }
})

async function handleLogin(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.message=="success")
    {
        localStorage.setItem("UserMovieToken",data.token)
        setLoading(false)
        saveUserData()
        toast.success(`welcome ${userData.name} in noxe`,
        {
        duration: 5000 ,
        position: 'top-center',
        className: ' bg-secondary  text-center text-white px-2'
        })
        navigateTo('/')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Login</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>

<div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>Login Now :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* password */}
    <label htmlFor="password" className='mb-2'>password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control pb-2 bg-white mb-2' />
    {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}

    <Link to="/forgotpassword" className='text-decoration-none'>Forgot Password ?</Link>
    <br />
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Login</button>}

    

    </form>
  </div>
  </>
}
