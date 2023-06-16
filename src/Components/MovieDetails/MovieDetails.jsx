import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Helmet} from "react-helmet";
import filmImg from "../../cinema-strip-64074_1280.webp"

export default function MovieDetails() {
let [loading,setLoading]=useState(false)

let {movieId,movieType}=useParams()
let [details,setDetails]=useState([])

async function getDetailsOfTrend()
{
  setLoading(true)
    let {data}=await axios.get(`https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=11aea264b42bb39978231edd88e35b3a&language=en-US`)
    console.log(data)

    setDetails(data)
    setLoading(false)
}
useEffect(()=>{
    getDetailsOfTrend()
},[])
  return <>
        <Helmet>
        <title>Details</title>  
        </Helmet>
     {
     loading==true?<div className='vh-100 d-flex justify-content-center align-items-center overflow-hidden'>
      <div className='text-center '>     <span className="loader"></span>  </div>
      </div>
    :

    <div className="container-fluid">
    <div className="row py-4">
        <div className="col-md-4">

        <img src={`https://image.tmdb.org/t/p/w500${details.poster_path?details.poster_path:details.profile_path}`} className='w-100 rounded-2'  />
 
        </div>
        <div className="col-md-8">
        <h2>{details.title?details.title:details.name}</h2>
        <p  className='py-2 detail_view'>{details.overview?details.overview:details.biography}</p>
        {details.birthday?
        <h5 className='mb-3' >birthday : <wbr/><wbr/>{details.birthday}</h5>   
        :null
        }
        {details.place_of_birth?
        <h5 className='mb-3' >place of birth : <wbr/><wbr/>{details.place_of_birth}</h5>   
        :null
        }
        {details.known_for_department?
        <h5 className='mb-3' >known for department : <wbr/><wbr/>{details.known_for_department}</h5>   
        :null
        }
        {details.genres?
        details.genres.map((el,index)=><span key={index} className='btn btn-info btn-sm me-2 mb-3 text-white'>{el.name}</span>)
        :null
        }
        {details.budget?
        <h5 className='mb-3' >budget : <wbr/><wbr/>{details.budget}</h5>   
        :null
        }
        {details.vote_average?
        <h5 className='mb-3' >vote average : <wbr/><wbr/>{details.vote_average.toFixed(1)}<i className='fas fa-star rating-color fs-6 ms-1 text-warning'/></h5>   
        :null
        }
        {details.vote_count?
        <h5 className='mb-3'>vote count : <wbr/><wbr/>{details.vote_count}</h5>   
        :null
        }
        {details.status?
        <h5 className='mb-3'>status : <wbr/><wbr/>{details.status}</h5>   
        :null
        }
        {details.type?
        <h5 className='mb-3'>type : <wbr/><wbr/>{details.type}</h5>   
        :null
        }
        {details.number_of_seasons?
        <h5 className='mb-3'>number of seasons : <wbr/><wbr/>{details.number_of_seasons}</h5>   
        :null
        }
        {details.number_of_episodes?
        <h5 className='mb-3'>number of episodes : <wbr/><wbr/>{details.number_of_episodes}</h5>   
        :null
        }
        {details.popularity?
        <h6 className='mb-3'>popularity : <wbr/><wbr/>{details.popularity}</h6>   
        :null
        }
        {details.release_date?
        <h6 className='mb-3'>release date : <wbr/><wbr/>{details.release_date}</h6>   
        :null
        }
        {details.tagline?
        <h6 className='mb-3'>tagline : <wbr/><wbr/>{details.tagline}</h6>   
        :null
        }
        {details.revenue?
        <h6 className='mb-3'>revenue : <wbr/><wbr/>{details.revenue}</h6>   
        :null
        }
        {details.origin_country?
        <h6 className='mb-3'>origin country : <wbr/><wbr/>{details.origin_country}</h6>   
        :null
        }
        {/* for language */}
        {details.spoken_languages>0?<p>spoken languages :<wbr/><wbr/> {details.spoken_languages?
        details.spoken_languages.map((el,index)=><span key={index} className='pe-2'><wbr/><wbr/>{el.name}</span>)
        :null
        } <wbr/><wbr/></p>:null}

        {/* origin_country */}
        {details.homepage?
        <a href={details.homepage} target="_blank" className='text-white text-decoration-none'><button className='btn btn-danger d-block mt-2 '>Source</button></a>

        :null
        }
        </div>
    </div>
  </div>
     }

  </>
}
