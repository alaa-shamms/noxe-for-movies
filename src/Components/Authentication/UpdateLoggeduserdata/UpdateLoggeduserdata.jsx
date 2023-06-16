import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'


export default function UpdateLoggeduserdata({logOut}) {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    name:Yup.string().required("Name is Required").min(4,"4 characters is too short").max(20,"20 characters is yoo long"),
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    phone:Yup.string().required("phone is Required").matches(/^01[01235][0-9]{8}$/,"You shoud enter valid phone"),

})
let formik=useFormik({
    initialValues:{
        name:"",
        email:"",
        phone:"",

    },
    validationSchema,
    onSubmit:(values)=>{

        handleUpdateLoggeduserdata(values)
    }
})
let headers=
{
  token:localStorage.getItem("UserMovieToken")
}

async function handleUpdateLoggeduserdata(values)
{
    setLoading(true)
    let {data}=await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/updateMe/`,values,{headers}).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.errors.param+" : "+err.response.data.errors.msg)
    })
    if(data.message=="success")
    {
        setLoading(false)
        toast.success("You have updated your data",
        {
        duration: 5000 ,
        position: 'top-center',
        className: ' bg-secondary  text-center text-white'
        })
        logOut()
        navigateTo('/login')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Update loged user data</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
  <h4 className='lightColor'>Update information about me  :</h4>
    <form onSubmit={formik.handleSubmit}>
    <h3 className='alert alert-danger font-sm'>YOU MUST UPDATE (EMAIL)</h3>
    {/* name */}
    <label htmlFor="name" className='mb-2'>name :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name='name' id='name' className='form-control pb-2' />
    {formik.errors.name&&formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* phone */}
    <label htmlFor="phone" classphone='mb-2'>phone :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control pb-2' />
    {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Update my data</button>}

    </form>
  </div>
  </>
}
