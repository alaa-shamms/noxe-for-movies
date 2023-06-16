import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItems({item}) {
  return<>
  <div className="col-md-3">
    {/* movie Detials */}
    <Link to={`/moviedetials/${item.id}/${item.media_type}`} className=' text-decoration-none text-white'>

    <div className='position-relative'>
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
  </>
}


