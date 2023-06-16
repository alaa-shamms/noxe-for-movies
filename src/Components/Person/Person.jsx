import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import unknown from "../../detective-161195_1280.png"
import { Link } from 'react-router-dom'



export default function Person() {


  let [loading,setLoading]=useState(false)


  // pagination

  let currentIndex=localStorage.getItem("PeopleNum")


// pagination for existing people
function nextFunc()
{
    currentIndex++
    localStorage.setItem("PeopleNum",currentIndex)
    console.log(currentIndex)
    if(currentIndex==totalPages)
    {
        currentIndex=1
        getPeople(currentIndex)

    }
    else
    {
      getPeople(currentIndex)

    }

}


function prevFunc()
{
    currentIndex--
    localStorage.setItem("PeopleNum",currentIndex)
    console.log(currentIndex)

    if(currentIndex<=0)
    {
        currentIndex=1
        localStorage.setItem("PeopleNum",currentIndex)

        getPeople(currentIndex)

    }
    else
    {
      getPeople(currentIndex)

    }
}





let totalPages;
let [personPage,setpersons]=useState([])

  async function getPeople(pageNumber=1) {
    setLoading(true)
    let {data}=await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=11aea264b42bb39978231edd88e35b3a&language=en-US&page=${pageNumber}`)
    console.log(data)
    setpersons(data.results)
    totalPages=data.total_pages
    localStorage.setItem("allPeople",totalPages)

    setLoading(false)

  }


  useEffect(()=>{

  if(localStorage.getItem("PeopleNum")!=null)
  {    
    getPeople(localStorage.getItem("PeopleNum"))

  }
  else
  {
    localStorage.setItem("PeopleNum",1)
    getPeople(localStorage.getItem("PeopleNum"))
  }
    if (localStorage.getItem("searchPersonValue")!=null)
    {
      getSearchResults(localStorage.getItem("searchPersonValue"),currentIndexForSearch)

    }
    else
    {

    localStorage.removeItem("searchPersonPages")

    }



  },[])




  // get results of search
  let searchPersonValue;
   async function getSearchResults(searchPersonValue,searchPersonNum)
  {
    
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/person?api_key=11aea264b42bb39978231edd88e35b3a&query=${searchPersonValue}&include_adult=false&language=en-US&page=${searchPersonNum}`)

    console.log(data)
    setpersons(data.results)
    localStorage.setItem("searchPersonPages",data.total_pages)


  }

  async function  searchMovie(e) {
    console.log(e.target.value)
    searchPersonValue=e.target.value
    localStorage.setItem("searchPersonValue",e.target.value)

    if(localStorage.getItem("searchPersonValue")!="")
    {
      getSearchResults(localStorage.getItem("searchPersonValue"),localStorage.getItem("searchPersonNum")?localStorage.getItem("searchPersonNum"):"1")

    }
    else
    {
      getPeople(localStorage.getItem("PeopleNum")?localStorage.getItem("PeopleNum"):"1")
      localStorage.removeItem("searchPersonPages")
      localStorage.removeItem("searchPersonNum")
      localStorage.removeItem("searchPersonValue")


    }
  }
  // paginatin for search results
let currentIndexForSearch=localStorage.getItem("searchPersonNum")?localStorage.getItem("searchPersonNum"):"1"

function nextFuncForSearch()
{
    currentIndexForSearch++
    console.log(currentIndexForSearch)
    localStorage.setItem("searchPersonNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchPersonNum"))>Number(localStorage.getItem("searchPersonPages")))
    {
        currentIndexForSearch=1
        localStorage.setItem("searchPersonNum",1)
        getSearchResults(localStorage.getItem("searchPersonValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchPersonValue"),currentIndexForSearch)

    }

}

function prevFuncForSearch()
{
    currentIndexForSearch--
    console.log(currentIndexForSearch)
    localStorage.setItem("searchPersonNum",currentIndexForSearch)

    if(Number(localStorage.getItem("searchPersonNum"))==0)
    {
        currentIndexForSearch=1
        localStorage.setItem("searchPersonNum",1)
        getSearchResults(localStorage.getItem("searchPersonValue"),currentIndexForSearch)

    }
    else
    {
      getSearchResults(localStorage.getItem("searchPersonValue"),currentIndexForSearch)

    }

}

  return <>
    <Helmet>
    <title>people popular page {localStorage.getItem("PeopleNum")?localStorage.getItem("PeopleNum"):"1"}
    </title>  
    </Helmet>
      {loading==true?<div className='vh-100 d-flex justify-content-center align-items-center overflow-hidden'>
      <div className='text-center '>     <span className="loader"></span>  </div>
      </div>
      :
      <>
      {/* search */}
        <input type="text"   onInput={searchMovie} className='w-75 mx-auto  text-danger form-control mt-3 mb-3' placeholder="search popular persons.........."  value={localStorage.getItem("searchPersonValue")?localStorage.getItem("searchPersonValue"):""}/>
      {/****************************************************************************** */}

      <div className="container-fluid">
      {/*people  */}
      <div className="row py-3">

        {/* add new pagination for search results  */}
          {localStorage.getItem("searchPersonPages")!=null?
                  <>
            <p className='text-center fs-4'>
              page : <span className='text-warning fs-4'>{localStorage.getItem("searchPersonNum")?localStorage.getItem("searchPersonNum"):"1"} of <wbr/><wbr/> <wbr/><wbr/>
              <span className='text-warning fs-4'>{localStorage.getItem("searchPersonPages")?localStorage.getItem("searchPersonPages"):"1"}</span>
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
        {personPage?.map((item,index)=>
                
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 ">
        {/* person Detials */}

           <Link to={`/moviedetials/${item.id}/${item.media_type="person"}`} className=' text-decoration-none text-white'>

         <div className='position-relative'>
          {/* <img src={`https://image.tmdb.org/t/p/w500${item.poster_path?item.poster_path:item.profile_path}`} className='w-100  rounded-2'  /> */}
          {/* img */}
          {item.profile_path?
          <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className='w-100 rounded-2'  />
          :
          <img src={unknown} className='w-100 rounded-2 mb-0 bg-secondary'  />
          } 

          <h3 className='h6 text-center mt-3 mb-2'>{item.title?item.title:item.name}</h3>
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

        {/* remove pagination of existing people while search */}
        {localStorage.getItem("searchPersonPages")!=null?
        null
        :
        <>
           <p className='text-center fs-4'>page : <span className='text-warning fs-4'>{localStorage.getItem("PeopleNum")} of {localStorage.getItem("allPeople")}</span></p>

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
