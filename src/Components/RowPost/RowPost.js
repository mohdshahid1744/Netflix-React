import React,{useState,useEffect} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import {imageURL,API_KEY} from '../../Constants/Constants'
import axios from '../../Axios'
function RowPost(props) {
  const [movies,setMovies]=useState([])
  const [urlId,setUrlId]=useState('')
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data);
      setMovies(response.data.results)
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovies=(id)=>{
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&langauge=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('Array is empty');
      }
    })
  }
  return (
    <div>
    <div className='row'style={{marginTop:'80px'}}>
      <h2>{props.title}</h2>
      <div className="posters">
        {
          movies.map((obj)=>

            <img onClick={()=>handleMovies(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${imageURL+obj.backdrop_path}`} alt="poster" />
          )
        }
        
      </div>
      { urlId &&  <Youtube videoId={urlId.key} opts={opts}/>}
    </div>
    </div>
  )
}

export default RowPost
