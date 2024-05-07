import React,{useEffect,useState} from 'react';

const API=()=>{

  const [show,setShow]=useState([])

  const getShow=async()=>{
    try{
      await fetch("https://api.themoviedb.org/3/discover/movie?api_key=c5ad51876c92eece98e5cda3a82b3d8b")
      .then(res=>res.json())
      .then(json=>console.log(json))
    }catch(err){
      console.error(err)
    }

  }
  
  useEffect(()=>{
    getShow()
  },[])

  return (
    <div>
      {show.map((data)=>{
        return<>
        <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}/>
        </>
      })}
    </div>
  )
}

export default API