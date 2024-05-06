import React from "react";
import {useEffect, useState} from 'react'
import Movie from './Movies'
import styled from 'styled-components';

const BackContainer = styled.div`
    background-color: darkBlue;
    display:flex;
    flex-wrap:wrap;
`;


function PopularPage(){

  const[movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=c5ad51876c92eece98e5cda3a82b3d8b");
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);


  return(
    <div>
      <BackContainer >
        {
          movies.map((item)=>{
            return(
                <Movie 
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  overview={item.overview}
                />              
                )
              })
        }

      </BackContainer>

    </div>
  );
}

export default PopularPage;
