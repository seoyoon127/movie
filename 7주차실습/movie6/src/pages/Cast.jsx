import React from 'react';    //Movie 컴포넌트
import styled from 'styled-components';

const IMG_URL="https://image.tmdb.org/t/p/original";

const CastContainer=styled.div`
    position: relative;
    width:90px; height:90px;
`
const IMG=styled.img`
    width:70px;
    height:70px;
    border-radius:50%;
`
const CastInfo=styled.div` 
    width:140px; height:70px;
    text-align:center;
    line-height:22px;
    position: absolute; top:75px; left:-30px;
    color:white;
    
`
export default function Cast(props) {//prop로 전달받음
  return (
    <div>
      <div>  
        <CastContainer>
            <IMG src={props.profile_path ? IMG_URL+props.profile_path : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'} alt={props.name} />
            <CastInfo>
              <div>{props.name}</div>
              <div>{props.known_for_department}</div>
            </CastInfo>
        </CastContainer>
      </div>  
    </div> 
  )
}