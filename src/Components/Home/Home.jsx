import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import MediaItems from '../MediaItems/MediaItems';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {


let [movies,setMovies]=useState([])
let [tv,setTv]=useState([])
let [people,setPeople]=useState([])
let [DayInfo,setDay]=useState([])


async function getTrendingWeek(mediaType,callBack) {
  let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=11aea264b42bb39978231edd88e35b3a`)
  callBack(data.results)
  console.log(data)
}

useEffect(()=>{
  getTrendingWeek("movie",setMovies)
  getTrendingWeek("tv",setTv)
  getTrendingWeek("person",setPeople)
  getTrendingDay()

},[])
var settings = {
  // dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay:true,
  swipeToSlide:true,
  autoplaySpeed:1500,
  arrows:false
  
  
};
async function getTrendingDay() {
  let {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=11aea264b42bb39978231edd88e35b3a`)
  setDay(data.results)
}
  return <>
    <Helmet>
    <title>Home</title>  
    </Helmet>
    {/* make loader */}
    {movies[0]?
    <>
    {/* owl  */}

   

            <div className="container-fluid bg_owl  mb-3">
            <div className="row  justify-content-center pt-4">

              <div className="col-md-11 pt-5 mt-3 mb-3">
              <h2 className='fw-bold'>OUR LATEST MOVIES</h2>

              <Slider {...settings}>
              {DayInfo.map((Element,index)=>
              <img key={index} src={`https://image.tmdb.org/t/p/w500${Element.poster_path?Element.poster_path:Element.profile_path}`} className='w-100 rounded-2 cursor_pointer'  />
              )}
               </Slider>
              </div>

            </div>
            </div>


    <div className="container-fluid">
      {/*1-movies trending */}
      <div className="row py-3">
        {/* left div */}
        <div className="col-md-3 d-flex align-items-center ">
          {/* static div */}
          <div>
          <div className="borderShape w-50 mb-3"></div>
          <h2 className='h3'>Trending<br/>Movies <br/> To Watch Now</h2>
          <p className='text-warning'>Most Wathed Movies By Week</p>
          <div className="borderShape w-100 mb-3"></div>            
          </div>

        </div>
        {/* api content */}
        {movies?.slice(0,11).map((item,index)=><MediaItems key={index} item={item}/>)}
      </div>

        {/* 2-tv trending */}
        <div className="row py-5">
          <div className='py-2'></div>
        {/* left div */}
        <div className="col-md-3 d-flex align-items-center ">
          {/* static div */}
          <div>
          <div className="borderShape w-50 mb-3"></div>
          <h2 className='h3'>Trending<br/>Tv <br/> To Watch Now</h2>
          <p className='text-warning'>Most Wathed Tv By Week</p>
          <div className="borderShape w-100 mb-3"></div>            
          </div>

        </div>
        {/* api content */}
        {tv?.slice(0,11).map((item,index)=><MediaItems key={index} item={item}/>)}
      </div>

        {/* 3-people trending */}
        <div className="row py-5">
          <div className='py-2'></div>
        {/* left div */}
        <div className="col-md-3 d-flex align-items-center ">
          {/* static div */}
          <div>
          <div className="borderShape w-50 mb-3"></div>
          <h2 className='h3'>Trending<br/>people <br/> To Watch Now</h2>
          <p className='text-warning'>Most Wathed people By Week</p>
          <div className="borderShape w-100 mb-3"></div>            
          </div>

        </div>
        {/* api content */}
        {people?.slice(0,11).map((item,index)=><MediaItems key={index} item={item}/>)}
      </div>

    </div>
    </>
    :
    // loader
    <div className='vh-100 d-flex justify-content-center align-items-center'>
    <div className='text-center'> 
    <span className="loader"></span> 
    </div> 
    </div> 
    }


  </>
  
}




