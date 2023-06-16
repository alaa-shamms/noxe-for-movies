import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'


export default function UpdateLogedPassword({logOut}) {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    currentPassword:Yup.string().required("currentPassword is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
    password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
    password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
})
let formik=useFormik({
    initialValues:{
        currentPassword:"",
        password:"",
        rePassword:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleUpdateLogedPassword(values)
    }
})
let headers=
{
    token:localStorage.getItem("UserMovieToken")
}
async function handleUpdateLogedPassword(values)
{
    setLoading(true)
    let {data}=await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword`,values,{headers}).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.message=="success")
    {
        setLoading(false)
        toast.success(`Your password  updated`,
        {
        duration: 8000,
        position: 'top-center',
        className: ' bg-main text-center text-white'
        })
        logOut()
        navigateTo('/login')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Update loged password</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>update password  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* password */}
    <label htmlFor="password" className='mb-2'>current Password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentPassword} type="password" name='currentPassword' id='currentPassword' className='form-control pb-2' />
    {formik.errors.currentPassword&&formik.touched.currentPassword?<div className='alert alert-danger'>{formik.errors.currentPassword}</div>:null}
    {/* password */}
    <label htmlFor="password" className='mb-2'>password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control pb-2' />
    {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
    {/* rePassword */}
    <label htmlFor="rePassword" className='mb-2'>rePassword :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control pb-2' />
    {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}

    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Update password</button>}

    

    </form>
  </div>
  </>
}
