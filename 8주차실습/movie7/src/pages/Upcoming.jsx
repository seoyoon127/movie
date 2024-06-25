import React from "react";
import {useEffect, useState} from 'react'
import Movie from './Movies'
import styled from 'styled-components';

const All=styled.div`
  background-color:darkblue;
  width: 100vw;
  display: flex;
  justify-content: center
`
const BackContainer = styled.div`
  width: 500px;    
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center;
  margin: 20px 0;
  @media (min-width: 768px) { 
      width: 1200px;
  }
`;


function Upcoming(){

  const[movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=c5ad51876c92eece98e5cda3a82b3d8b&language=ko-KR');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);


  return(
    <All>
      <BackContainer >
        {
          movies.map((item)=>{
            return(
                <Movie 
                  title={item.title}
                  id={item.id}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  backdrop_path={item.backdrop_path}
                  release_date={item.release_date}
                  overview={item.overview}
                />              
                )
              })
        }

      </BackContainer>

    </All>
  );
}

export default Upcoming;