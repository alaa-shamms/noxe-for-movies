import React from 'react'
import {Helmet} from "react-helmet";

export default function Error404() {
  return <>
    <Helmet>
    <title>Error page</title>  
    </Helmet>
    <div className='d-flex justify-content-center align-items-center  bg-white err_container'>
    <div className='err_page'></div>

    </div>
  </>

}
