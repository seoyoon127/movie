import React from 'react';
import styled from 'styled-components';

const Welcome=styled.div`
  background-color:black;
  height:50%; width:100%;
  position:absolute;
  top:40px;
  text-align:center;
  line-height:300px;
  color:white;
`
const SearchMovie=styled.div`
  background-color:darkBlue;
  height:45%; width:100%;
  position:absolute;
  top:500px;
  text-align:center;
  line-height:300px;
  color:white;
`
export default function MainPage(){
    return(
      <div>
        <Welcome><h2>환영합니다!</h2></Welcome>
        <SearchMovie><h1>🎥 Find your movies!</h1></SearchMovie>
      </div>
      
    )
  }