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
    resetCode:Yup.string().required("Reset Code is Required").min(5,"min lenght 5").max(6,"max lenght 6"),


})
let formik=useFormik({
    initialValues:{
        resetCode:"",
    },
    validationSchema,
    onSubmit:(values)=>{

        handleverifyCode(values)
    }
})

async function handleverifyCode(values)
{
    setLoading(true)
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values).catch((err)=>{
        setLoading(false)
    console.log(err)
        setErrMsg(err.response.data.statusMsg+" : "+err.response.data.message)
    })
    if(data.status=="Success")
    {
        setLoading(false)
        toast.success(`You can update your password`,
        {
        duration: 10000 ,
        position: 'top-center',
        className: ' bg-secondary  text-center text-white'
        })
        navigateTo('/ResetPassword')
    }
    console.log(data)

}
  return <>
    <Helmet>
    <title>Verify code</title>  
    </Helmet>
    <div className='position-relative' >
        <div className='position-absolute top-0 end-0'>
        <ParticlesPlugin/>
        </div>
    </div>
  <div className="w-75 mx-auto py-5">
    <h4 className='lightColor'>Enter Reset Code  :</h4>
    <form onSubmit={formik.handleSubmit}>
    {/* resetCode */}
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" name='resetCode' id='resetCode' className='form-control pb-1' />
    {formik.errors.resetCode&&formik.touched.resetCode?<div className='alert alert-danger'>{formik.errors.resetCode}</div>:null}
  
    <br />
    {/* submit button  and loading*/}
    {ErrMsg?<div className='alert alert-danger mt-2'>{ErrMsg}</div>:null}
    {Loading==true?<div className='btn bg-main text-white mt-2'><i className="fas fa-spinner fa-spin"></i></div>
    :<button disabled={!(formik.isValid&&formik.dirty)} className='btn lightBgColor text-white mt-2'>verify Code</button>}

    

    </form>
  </div>
  </>
}
