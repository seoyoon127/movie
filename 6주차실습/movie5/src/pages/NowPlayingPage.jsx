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
width: 1200px;
gap: 20px;
display: flex;
flex-wrap: wrap;
margin: 20px 0;
`;


function NowPlayingPage(){

  const[movies, setMovies] = useState([]);

  useEffect(() => {  //마운트될 시 실행
    const fetchMovies = async () => { //비동기 구문-async, await 이용:.then보다 가독성 좋음
      try { //jsx에선 가독성을 위해 try,catch문 형식을 이용
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c5ad51876c92eece98e5cda3a82b3d8b&language=ko-KR');  
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

export default NowPlayingPage;