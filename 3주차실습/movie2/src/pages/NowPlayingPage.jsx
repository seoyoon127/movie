import React from "react";
import {useEffect, useState} from 'react'
import Movie from './Movies'
import styled from 'styled-components';

const BackContainer = styled.div`
    background-color: darkBlue;
    display:flex;
    flex-wrap:wrap;
`;


function NowPlayingPage(){

  const[movies, setMovies] = useState([]);

  useEffect(() => {  //마운트될 시 실행
    const fetchMovies = async () => { //비동기 구문-async, await 이용:.then보다 가독성 좋음
      try { //jsx에선 가독성을 위해 try,catch문 형식을 이용
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c5ad51876c92eece98e5cda3a82b3d8b');  
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

export default NowPlayingPage;