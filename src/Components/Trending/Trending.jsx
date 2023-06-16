import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Trending() {

let [TrendingData,setTrending]=useState([])
let [loading,setLoading]=useState(false)

// type
let trendType;
  function chageTrendType(e)
  {
    console.log(e.target.id)
    trendType=e.target.id
    localStorage.setItem("TrendType",trendType)
    localStorage.setItem("trendPageNum",1)
    getTrending(localStorage.getItem("TrendType"),localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")
  }  

  // time
  let TrendTime;
  function chageTrendTime(e)
  {
    console.log(e.target.id)
    TrendTime=e.target.id
    localStorage.setItem("TrendTime",TrendTime)
    localStorage.setItem("trendPageNum",1)
    getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime"),localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")

  }  

let total_pages;
let currentIndex=localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1";
//   get api data
  async function getTrending(trendType="movie",TrendTime="day",pageNumber=1) {
    setLoading(true)

    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${trendType}/${TrendTime}?api_key=11aea264b42bb39978231edd88e35b3a&page=${pageNumber}`)
    setTrending(data.results)
    total_pages=data.total_pages
    localStorage.setItem("total_Pages_trending",total_pages)
    console.log(data)
    setLoading(false)

  }

  // pagination for existing movies
function nextFunc()
{
    currentIndex++
    localStorage.setItem("trendPageNum",currentIndex)
    console.log(currentIndex)
    if(currentIndex==total_pages)
    {
        currentIndex=1
        getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")

    }
    else
    {
      getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")

    }

}


function prevFunc()
{
    currentIndex--
    localStorage.setItem("trendPageNum",currentIndex)
    console.log(currentIndex)

    if(currentIndex<=0)
    {
        currentIndex=1
        localStorage.setItem("trendPageNum",currentIndex)

        getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")

    }
    else
    {
      getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")

    }
}


  useEffect(()=>{
    getTrending(localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie",localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day",localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1")
  },[])
  return <>
    <Helmet>
    <title>{localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie"} page {localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1"} trending per {localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day"}
    </title>  
    </Helmet>

    {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center overflow-hidden'>
      <div className='text-center '>     <span className="loader"></span>  </div>
      </div>
      :
    <>
          <div className='d-flex justify-content-between mt-4 mb-3 mx-4 flex-wrap '>
      {/* dropdown for categories */}
        <div className="dropdown ">
         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          choose category 
         </button>
         <ul className="dropdown-menu cursor_pointer">
          <li><a onClick={chageTrendType} className="dropdown-item" id='movie'>Movies</a></li>
          <li><a onClick={chageTrendType} className="dropdown-item" id='tv' >tv shows</a></li>
          <li><a onClick={chageTrendType} className="dropdown-item" id='person'>people</a></li>
         </ul>
         <h3 className='text-warning mt-3 ms-5 ps-1'>{localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie"}</h3>

        </div>

        {/* dropdown for time */}
        <div className="dropdown ">
         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         Choose  time period
         </button>
         <ul className="dropdown-menu cursor_pointer">
          <li><a onClick={chageTrendTime} className="dropdown-item" id='day'>Day</a></li>
          <li><a onClick={chageTrendTime} className="dropdown-item" id='week' >Week</a></li>
         </ul>

         <h3 className='text-danger mt-3 ms-5 ps-1'>{localStorage.getItem("TrendTime")?localStorage.getItem("TrendTime"):"day"}</h3>

        </div>

      </div>


      {/* api data */}

      <div className="container-fluid">

      <div className="row py-3">

        {/* api content */}
        {TrendingData?.map((item,index)=>
                
        <div key={index} className=" col-lg-3 col-md-4 col-sm-6  ">
        {/* movie Detials */}
        <Link to={`/moviedetials/${item.id}/${item.media_type=localStorage.getItem("TrendType")?localStorage.getItem("TrendType"):"movie"}`} className=' text-decoration-none text-white'>
    
        <div className='position-relative'>
          {/* img */}

        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path?item.poster_path:item.profile_path}`} className='w-100 rounded-2'  />

        <h3 className='h6 text-center mt-2'>{item.title?item.title:item.name}</h3>
        {/* if rating exist or not */}
        {item.vote_average?
        <span className='position-absolute top-0 end-0 bg-info rounded-2 p-1 d-flex align-items-center'>{item.vote_average.toFixed(1)}<i className='fas fa-star rating-color starSize'/></span>   
        :null
        }
        </div>
    
        </Link>
    
      </div>

        )}
      </div>

        {/*  pagination of data */}

        <>
           <p className='text-center fs-4'>page : <span className='text-warning fs-4'>{localStorage.getItem("trendPageNum")?localStorage.getItem("trendPageNum"):"1"} of {localStorage.getItem("total_Pages_trending")}</span></p>

             <div id="innerBox" className="d-flex justify-content-center">
              <div className='d-flex justify-content-between'>
              <i onClick={()=>prevFunc()} id="prev" className="fa-regular fa-arrow-alt-circle-left  fa-2x mx-3"></i>
              <i onClick={()=>nextFunc()} id="next" className="fa-regular fa-arrow-alt-circle-right  fa-2x"></i> 
              </div> 
              </div>

        </>
        
     



      </div> 
    </>

 }
  </>
   
}
