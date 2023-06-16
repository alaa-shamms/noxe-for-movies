import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import seriesImg from "../../cinema-strip-64074_1280.webp"
import { Link } from 'react-router-dom'



export default function TV() {


  let [loading,setLoading]=useState(false)


  // pagination

  let currentIndex=localStorage.getItem("tvNum")


// pagination for existing tv shows
function nextFunc()
{
    currentIndex++
    localStorage.setItem("tvNum",currentIndex)
    console.log(currentIndex)
    if(currentIndex==totalPages)
    {
        currentIndex=1
        getTvShows(currentIndex,localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")

    }
    else
    {
      getTvShows(currentIndex,localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")

    }

}


function prevFunc()
{
    currentIndex--
    localStorage.setItem("tvNum",currentIndex)
    console.log(currentIndex)

    if(currentIndex<=0)
    {
        currentIndex=1
        localStorage.setItem("tvNum",currentIndex)

        getTvShows(currentIndex,localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")

    }
    else
    {
      getTvShows(currentIndex,localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")

    }
}





let totalPages;
let [moviesPage,setMovies]=useState([])
let [category,setcategory]=useState("popular")

  async function getTvShows(pageNumber=1,type="popular") {
    setLoading(true)
    let {data}=await axios.get(`https://api.themoviedb.org/3/tv/${type}?api_key=11aea264b42bb39978231edd88e35b3a&language=en-US&page=${pageNumber}`)
    console.log(data)
    setMovies(data.results)
    totalPages=data.total_pages
    localStorage.setItem("allTvShows",totalPages)

    setLoading(false)

  }


  useEffect(()=>{

  if(localStorage.getItem("tvNum")!=null)
  {    
    getTvShows(localStorage.getItem("tvNum"),localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")

  }
  else
  {
    localStorage.setItem("tvNum",1)
    getTvShows(localStorage.getItem("tvNum"),localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")
  }
    if (localStorage.getItem("searchTvValue")!=null)
    {
      getSearchResults(localStorage.getItem("searchTvValue"),currentIndexForSearch)

    }
    else
    {

    localStorage.removeItem("searchTvPages")

    }



  },[])

  function changeTvType(temp) {
    let tvType=temp.target.id
    console.log(tvType)
    setcategory(tvType)
    localStorage.setItem("tvNum",1)
    localStorage.setItem("tvType",tvType)

    getTvShows(1,localStorage.getItem("tvType"))
    localStorage.removeItem("searchTvValue")
    localStorage.removeItem("searchTvNum")
    localStorage.removeItem("searchTvPages")

  }


  // get results of search
  let searchTvValue;
   async function getSearchResults(searchTvValue,searchTvNum)
  {
    
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=11aea264b42bb39978231edd88e35b3a&query=${searchTvValue}&include_adult=false&language=en-US&page=${searchTvNum}`)

    console.log(data)
    setMovies(data.results)
    localStorage.setItem("searchTvPages",data.total_pages)


  }

  async function  searchMovie(e) {
    console.log(e.target.value)
    searchTvValue=e.target.value
    localStorage.setItem("searchTvValue",e.target.value)

    if(localStorage.getItem("searchTvValue")!="")
    {
      getSearchResults(localStorage.getItem("searchTvValue"),localStorage.getItem("searchTvNum")?localStorage.getItem("searchTvNum"):"1")

    }
    else
    {
      getTvShows(localStorage.getItem("tvNum")?localStorage.getItem("tvNum"):"1",localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular")
      localStorage.removeItem("searchTvPages")
      localStorage.removeItem("searchTvNum")
      localStorage.removeItem("searchTvValue")


    }
  }
  // paginatin for search results
let currentIndexForSearch=localStorage.getItem("searchTvNum")?localStorage.getItem("searchTvNum"):"1"

function nextFuncForSearch()
{
    currentIndexForSearch++
    console.log(currentIndexForSearch)
    localStorage.setItem("searchTvNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchTvNum"))>Number(localStorage.getItem("searchTvPages")))
    {
        currentIndexForSearch=1
        localStorage.setItem("searchTvNum",1)
        getSearchResults(localStorage.getItem("searchTvValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchTvValue"),currentIndexForSearch)

    }

}

function prevFuncForSearch()
{
    currentIndexForSearch--
    console.log(currentIndexForSearch)
    localStorage.setItem("searchTvNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchTvNum"))==0)
    {
        currentIndexForSearch=1
        localStorage.setItem("searchTvNum",1)
        getSearchResults(localStorage.getItem("searchTvValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchTvValue"),currentIndexForSearch)

    }

}

  return <>
    <Helmet>
    <title>movies {localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular"} page {localStorage.getItem("tvNum")?localStorage.getItem("tvNum"):"1"}
    </title>  
    </Helmet>
      {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center overflow-hidden'>
      <div className='text-center '>     <span className="loader"></span>  </div>
      </div>
      :
      <>
      {/* search */}
        <input type="text"   onInput={searchMovie} className='w-75 mx-auto  text-danger form-control mt-3' placeholder="search TV shows.........."  value={localStorage.getItem("searchTvValue")?localStorage.getItem("searchTvValue"):""}/>
      {/****************************************************************************** */}
      <div className='d-flex justify-content-center mt-4 mb-3'>
        <div className="dropdown ">
         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Tv types
         </button>
         <ul className="dropdown-menu cursor_pointer">
             <li><a onClick={changeTvType} className="dropdown-item" id='popular'>popular</a></li>
             <li><a onClick={changeTvType} className="dropdown-item" id='airing_today' >airing today</a></li>
             <li><a onClick={changeTvType} className="dropdown-item" id='on_the_air'>on the air</a></li>
            <li><a onClick={changeTvType} className="dropdown-item" id='top_rated'>top rated</a></li>

         </ul>
        </div>
      </div>

      <div className="container-fluid">
      {/*tv shows  */}
      <div className="row py-3">
        <h3 className='text-center text-info mb-5'>{localStorage.getItem("tvType")?localStorage.getItem("tvType"):"popular"}</h3>

        {/* add new pagination for search results  */}
          {localStorage.getItem("searchTvPages")!=null?
                  <>
            <p className='text-center fs-4'>
              page : <span className='text-warning fs-4'>{localStorage.getItem("searchTvNum")?localStorage.getItem("searchTvNum"):"1"} of <wbr/><wbr/> <wbr/><wbr/>
              <span className='text-warning fs-4'>{localStorage.getItem("searchTvPages")?localStorage.getItem("searchTvPages"):"1"}</span>
              </span></p>
           

              <div id="innerBox" className="d-flex justify-content-center py-3">
                <div className='d-flex justify-content-between'>
                <i onClick={()=>prevFuncForSearch()} id="prev" className="fa-regular fa-arrow-alt-circle-left  fa-2x mx-3"></i>
                <i onClick={()=>nextFuncForSearch()} id="next" className="fa-regular fa-arrow-alt-circle-right  fa-2x"></i> 
                </div> 
                </div>

          </>
          :
            null
          }

        {/* api content */}
        {moviesPage?.map((item,index)=>
                
        <div key={index} className="col-lg-3 col-md-4 col-sm-6  ">
        {/* tv shows Detials */}
        <Link to={`/moviedetials/${item.id}/${item.media_type="tv"}`} className=' text-decoration-none text-white'>
    
        <div className='position-relative'>
          {/* img */}
        {item.poster_path?
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='w-100 rounded-2'  />
        :
        <img src={seriesImg} className='w-100 rounded-2 mb-5 pb-5'  />

        }
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

        {/* remove pagination of existing tv shows while search */}
        {localStorage.getItem("searchTvPages")!=null?
        null
        :
        <>
           <p className='text-center fs-4'>page : <span className='text-warning fs-4'>{localStorage.getItem("tvNum")} of {localStorage.getItem("allTvShows")}</span></p>

             <div id="innerBox" className="d-flex justify-content-center">
              <div className='d-flex justify-content-between'>
              <i onClick={()=>prevFunc()} id="prev" className="fa-regular fa-arrow-alt-circle-left  fa-2x mx-3"></i>
              <i onClick={()=>nextFunc()} id="next" className="fa-regular fa-arrow-alt-circle-right  fa-2x"></i> 
              </div> 
              </div>

        </>
        }
     



      </div> 

      </>

      }



  </>
  
}


