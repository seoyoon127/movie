import React from 'react';
import styled from 'styled-components';

const Welcome=styled.div`
  background-color:black;
  height:45%; width:100%;
  position:absolute;
  top:40px;
  text-align:center;
  line-height:300px;
  color:white;
`
const SearchMovieTitle=styled.div`
  background-color:darkBlue;
  max-width:100%;
  height:57%; width:100%;
  position:absolute;
  top:400px;
  text-align:center;
  line-height:300px;
  color:white;
`
const SearchMovieInput=styled.input`
  color:white;
  position:absolute;
  top:630px;
  left:38%;
  width:400px; height:30px;
  border-radius:40px;
`
const SearchMovieButton=styled.button`
  position:absolute;
  top:635px;
  left:63%;
  width:30px; height:30px;
  border-radius:50%;
  background-color:#FFD252;
`

export default function MainPage(){
    return(
      <div>
        <Welcome><h2>환영합니다!</h2></Welcome>
        <SearchMovieTitle><h1>🎥 Find your movies!</h1></SearchMovieTitle>
        <div>
            <span><SearchMovieInput></SearchMovieInput></span>
            <span><SearchMovieButton>🔍</SearchMovieButton></span>
        </div>
      </div>
      
    )
  }