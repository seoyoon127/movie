import React from 'react';    //Movie 컴포넌트
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const MovieContainer = styled.div`
  position: relative;
  width:250px;
  column-gap: 20px;
  height:450px;
  margin:10px;
`;
const IMG=styled.img`
  width:250px; height:380px;
`
const InfoBox=styled.div`
  position:relative;
  width:100%; height:80px;
  color:white;
  line-height: 25px;
  background-color: rgb(44, 44, 181);
  border-radius: 0 0 10px 10px;
  .title{
    position:absolute;
    left:0px;
    right:60px;
  }
  .vote_avg{
    position:absolute;
    right:0;
  }
`
const IMG_URL="https://image.tmdb.org/t/p/original";

export default function Movie(props) {//prop로 전달받음
  const navigate=useNavigate();
  const detailPage=()=>{
      navigate(`/${props.id}`,{
        state:props
      })
  }
  return (
    <div>
      <div>  
      <MovieContainer>
        <IMG src={IMG_URL+props.poster_path} alt={props.title} onClick={detailPage}/>
        <InfoBox className='infoBox'>
          <span className='title'>{props.title}</span>
          <span className='vote_avg'>⭐{props.vote_average}</span>
        </InfoBox>
      </MovieContainer>
      </div>  
    </div> 
  )
}