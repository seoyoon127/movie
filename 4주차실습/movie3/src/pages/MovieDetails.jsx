import React from 'react';  
import { useParams,useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from "../pages/NotFound";

const IMG_URL="https://image.tmdb.org/t/p/original";

const Container=styled.div`
    height:96%;
    background-image:url(${props => props.backdrop_path}) ;
    background-size: 100%;
    position: relative;
`;
const Overlay=styled.div`
    background-color:rgba(0,0,139,0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
const Img=styled.img`
    width:300px;
    position:absolute;
    top:25%; left:20%;
`;
const Info=styled.div`
    color:white;
    position:absolute;
    top:30%; left:45%;
    .title{
        font-size:35px;
        font-weight:800;
    }
    .other{
        font-size:18px;
        font-weight:800;
    }
    .star{
        grid-template-columns: repeat(${props => props.avg}, 20px);
    }
    .overview{
        width:600px;
    }
`
function MovieDetails(){

    const{title}=useParams();
    const {state}=useLocation();
   
    // 데이터가 존재하지 않으면 404 페이지를 렌더링
    if (!state || !state.poster_path) {
        return <NotFound />;
    }
    const avg=state.vote_average?Math.floor(state.vote_average):0;
    const overview_ment=state.overview? state.overview : "TMDB에서 제공하는 API에 상세 줄거리가 없습니다.";
    return(
        <Container backdrop_path={IMG_URL+state.backdrop_path} className='bg'>
            <Overlay />
            <Img src={IMG_URL+state.poster_path} alt={title} ></Img>
            <Info>
                <div className='title'>{title}</div><br />
                <div className='other'>평점 </div><br />
                <div className='other'>개봉일 {state.release_date}</div><br />
                <div className='other'>줄거리  {Array.from({ length: avg }, ( _, i) => <span className='star'>⭐</span>)}</div><br />
                <div className='overview'>{overview_ment} </div>
            </Info>
        </Container>
    );
}

export default MovieDetails;