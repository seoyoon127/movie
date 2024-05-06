import React from 'react';    //Movie 컴포넌트
import styled from 'styled-components';

const MovieContainer = styled.div`
  width:250px;
  margin:10px;
  position: relative;
  &:hover .overview {
    display: block;
    position:absolute;
    top:0px;
    background-color: rgba(0,0,0,0.8);
    height: 450px; width: 250px;
    color:white;
  }
  &:hover .infoBox{
    background-color: rgba(0,0,0,0.8);
    display:none;
  }
`;
const Overview=styled.div`
  display: none;
`;
const InfoBox=styled.div`
  position:relative;
  width:100%; height:70px;
  color:white;
  line-height: 30px;
  background-color: rgb(44, 44, 181);
  border-radius: 0 0 10px 10px;
  .title{
    position:absolute;
    left:0px;
    right:80px;
  }
  .vote_avg{
    position:absolute;
    right:0;
  }
`
const IMG_URL="https://image.tmdb.org/t/p/original";

export default function Movie({title,poster_path,vote_average,overview}) {//prop로 전달받음
  return (
    <MovieContainer>
      <img style={{width:'250px'}} src={IMG_URL+poster_path} alt={title}/>
        <Overview className='overview'>
          <div>{title}<br/>{overview}</div>
        </Overview>
        <InfoBox className='infoBox'>
          <span className='title'>{title}</span>
          <span className='vote_avg'>⭐{vote_average}</span>
        </InfoBox>
    </MovieContainer>
  )
}