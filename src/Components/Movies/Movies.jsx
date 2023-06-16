import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import filmImg from "../../cinema-strip-64074_1280.webp"
import { Link } from 'react-router-dom'



export default function Movies() {


  let [loading,setLoading]=useState(false)


  // pagination

  let currentIndex=localStorage.getItem("moviesNum")


// pagination for existing movies
function nextFunc()
{
    currentIndex++
    localStorage.setItem("moviesNum",currentIndex)
    console.log(currentIndex)
    if(currentIndex==totalPages)
    {
        currentIndex=1
        getMovies(currentIndex,localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")

    }
    else
    {
      getMovies(currentIndex,localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")

    }

}


function prevFunc()
{
    currentIndex--
    localStorage.setItem("moviesNum",currentIndex)
    console.log(currentIndex)

    if(currentIndex<=0)
    {
        currentIndex=1
        localStorage.setItem("moviesNum",currentIndex)

        getMovies(currentIndex,localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")

    }
    else
    {
      getMovies(currentIndex,localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")

    }
}





let totalPages;
let [moviesPage,setMovies]=useState([])
let [category,setcategory]=useState("popular")

  async function getMovies(pageNumber=1,type="popular") {
    setLoading(true)
    let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=11aea264b42bb39978231edd88e35b3a&language=en-US&page=${pageNumber}`)
    console.log(data)
    setMovies(data.results)
    totalPages=data.total_pages
    localStorage.setItem("allMovies",totalPages)
    setLoading(false)

  }


  useEffect(()=>{

  if(localStorage.getItem("moviesNum")!=null)
  {    
    getMovies(localStorage.getItem("moviesNum"),localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")

  }
  else
  {
    localStorage.setItem("moviesNum",1)
    getMovies(localStorage.getItem("moviesNum"),localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")
  }
    if (localStorage.getItem("searchValue")!=null)
    {
      getSearchResults(localStorage.getItem("searchValue"),currentIndexForSearch)

    }
    else
    {

    localStorage.removeItem("searchMoviePages")

    }



  },[])

  function changeMovietype(temp) {
    let movieType=temp.target.id
    console.log(movieType)
    setcategory(movieType)
    localStorage.setItem("moviesNum",1)
    localStorage.setItem("movieType",movieType)

    getMovies(1,localStorage.getItem("movieType"))
    localStorage.removeItem("searchValue")
    localStorage.removeItem("searchNum")
    localStorage.removeItem("searchMoviePages")

  }


  // get results of search
  let searchValue;
   async function getSearchResults(searchValue,searchNum)
  {
    
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=11aea264b42bb39978231edd88e35b3a&query=${searchValue}&include_adult=false&language=en-US&page=${searchNum}`)

    console.log(data)
    setMovies(data.results)
    localStorage.setItem("searchMoviePages",data.total_pages)


  }

  async function  searchMovie(e) {
    console.log(e.target.value)
    searchValue=e.target.value
    localStorage.setItem("searchValue",e.target.value)

    if(localStorage.getItem("searchValue")!="")
    {
      getSearchResults(localStorage.getItem("searchValue"),localStorage.getItem("searchNum")?localStorage.getItem("searchNum"):"1")

    }
    else
    {
      getMovies(localStorage.getItem("moviesNum")?localStorage.getItem("moviesNum"):"1",localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular")
      localStorage.removeItem("searchMoviePages")
      localStorage.removeItem("searchNum")
      localStorage.removeItem("searchValue")


    }
  }
  // paginatin for search results
let currentIndexForSearch=localStorage.getItem("searchNum")?localStorage.getItem("searchNum"):"1"

function nextFuncForSearch()
{
    currentIndexForSearch++
    console.log(currentIndexForSearch)
    localStorage.setItem("searchNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchNum"))>Number(localStorage.getItem("searchMoviePages")))
    {
        currentIndexForSearch=1
        localStorage.setItem("searchNum",1)
        getSearchResults(localStorage.getItem("searchValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchValue"),currentIndexForSearch)

    }

}

function prevFuncForSearch()
{
    currentIndexForSearch--
    console.log(currentIndexForSearch)
    localStorage.setItem("searchNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchNum"))==0)
    {
        currentIndexForSearch=1
        localStorage.setItem("searchNum",1)
        getSearchResults(localStorage.getItem("searchValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchValue"),currentIndexForSearch)

    }

}

  return <>
    <Helmet>
    <title>movies {localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular"} page {localStorage.getItem("moviesNum")?localStorage.getItem("moviesNum"):"1"}
    </title>  
    </Helmet>
      {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center overflow-hidden'>
      <div className='text-center '>     <span className="loader"></span>  </div>
      </div>
      :
      <>
      {/* search */}
        <input type="text"   onInput={searchMovie} className='w-75 mx-auto  text-danger form-control mt-3' placeholder="search movies.........."  value={localStorage.getItem("searchValue")?localStorage.getItem("searchValue"):""}/>
      {/****************************************************************************** */}
      <div className='d-flex justify-content-center mt-4 mb-3'>
        <div className="dropdown ">
         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          movies types
         </button>
         <ul className="dropdown-menu cursor_pointer">
          <li><a onClick={changeMovietype} className="dropdown-item" id='popular'>popular</a></li>
          <li><a onClick={changeMovietype} className="dropdown-item" id='now_playing' >now playing</a></li>
          <li><a onClick={changeMovietype} className="dropdown-item" id='top_rated'>top rated</a></li>
          <li><a onClick={changeMovietype} className="dropdown-item" id='upcoming'>upcoming</a></li>

         </ul>
        </div>
      </div>

      <div className="container-fluid">
      {/*movies  */}
      <div className="row py-3">
        <h3 className='text-center text-info mb-5'>{localStorage.getItem("movieType")?localStorage.getItem("movieType"):"popular"}</h3>

        {/* add new pagination for search results  */}
          {localStorage.getItem("searchMoviePages")!=null?
                  <>
            <p className='text-center fs-4'>
              page : <span className='text-warning fs-4'>{localStorage.getItem("searchNum")?localStorage.getItem("searchNum"):"1"} of <wbr/><wbr/> <wbr/><wbr/>
              <span className='text-warning fs-4'>{localStorage.getItem("searchMoviePages")?localStorage.getItem("searchMoviePages"):"1"}</span>
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
                
        <div key={index} className=" col-lg-3 col-md-4 col-sm-6  ">
        {/* movie Detials */}
        <Link to={`/moviedetials/${item.id}/${item.media_type="movie"}`} className=' text-decoration-none text-white'>
    
        <div className='position-relative'>
          {/* img */}
        {item.poster_path?
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='w-100 rounded-2'  />
        :
        <img src={filmImg} className='w-100 rounded-2 mb-5 pb-5'  />

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

        {/* remove pagination of existing movies while search */}
        {localStorage.getItem("searchMoviePages")!=null?
        null
        :
        <>
           <p className='text-center fs-4'>page : <span className='text-warning fs-4'>{localStorage.getItem("moviesNum")} of {localStorage.getItem("allMovies")}</span></p>

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
