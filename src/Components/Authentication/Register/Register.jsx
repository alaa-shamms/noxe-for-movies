import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
  import {Helmet} from "react-helmet";
import ParticlesPlugin from '../../Particles/ParticlesPlugin'


export default function Register() {
let navigateTo=useNavigate()
let [ErrMsg,setErrMsg]=useState("")    
let [Loading,setLoading]=useState(false)   
let validationSchema=Yup.object({
    name:Yup.string().required("Name is Required").min(4,"4 characters is too short").max(20,"20 characters is yoo long"),
    email:Yup.string().required("email is Required").email("You shoud enter valid e-mail"),
    password:Yup.string().required("Password is Required").matches(/^[0-9][a-zA-Z0-9]{5,9}$/,"You shoud start with number and between 6 to 9 any characters or numbers"),
    rePassword:Yup.string().required("Repassword is Required").oneOf([Yup.ref("password")],"Password and Repassword not matched"),
    phone:Yup.string().required("phone is Required").matches(/^01[01235][0-9]{8}$/,"You shoud enter valid phone"),

})
let formik=useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:"",

    },
    validationSchema,
    onSubmit:(values)=>{

        handleRegister(values)
    }
})

async function handleRegister(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.message=="success")
    {
        setLoading(false)
        toast.success("You register successfully",
        {
        duration: 8000 ,
        position: 'top-center',
        className: ' bg-secondary  text-center text-white'
        })
        navigateTo('/login')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Register</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>Register Now :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* name */}
    <label htmlFor="name" className='mb-2'>name :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name='name' id='name' className='form-control pb-2' />
    {formik.errors.name&&formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
    {/* email */}
    <label htmlFor="email" className='mb-2'>email :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control pb-2' />
    {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
    {/* password */}
    <label htmlFor="password" className='mb-2'>password :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control pb-2' />
    {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
    {/* rePassword */}
    <label htmlFor="rePassword" className='mb-2'>rePassword :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control pb-2' />
    {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}
    {/* phone */}
    <label htmlFor="phone" classphone='mb-2'>phone :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control pb-2' />
    {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>Register</button>}

    </form>
  </div>
  </>
}
