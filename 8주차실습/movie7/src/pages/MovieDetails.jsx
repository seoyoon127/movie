import React, { useState,useEffect } from 'react';  
import {useLocation,useParams } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from "./NotFound";
import Cast from './Cast';

const IMG_URL="https://image.tmdb.org/t/p/original";
const API="https://api.themoviedb.org/3/movie";
const api_key="c5ad51876c92eece98e5cda3a82b3d8b";

const Container=styled.div`
    height:300%;
    background-image:url(${props => props.backdrop_path}) ;
    background-size: 1700px;
    background-repeat:no-repeat;
    position: relative;
`;
const Overlay=styled.div`
    background-color:rgba(0,0,139,0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 940px; /*빈공간*/
`
const CastBg=styled.div`
    background-color:rgba(0,0,139,1);
    position: absolute;
    top: 950px;
    left: 0;
    right: 0;
    bottom: 0; /*빈공간*/
    .title{
        color:white;
        font-size:23px;
        font-weight:800;
        text-align:center;
    }
`
const Box=styled.div`
    height:100%; width:100%;
    display: flex;
    justify-content: center;
    }
`
const Img=styled.img`
    width:300px;height:450px;
    position:relative;
    top:2%; 
    @media (min-width: 768px) { 
      top:8%; 
      margin-right:50%;
    }
    @media (min-width: 1450px) { 
      top:8%; 
      margin-right:30%;
    }
`;
const Info=styled.div`
    position:absolute;
    top:19%;
    margin-left:10%;
    color:white;
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
        width:500px;
    }
    @media (min-width: 768px) {   
        top:10%;
        margin-left:30%;
        .overview{
            width:400px;
    }
    }
    @media (min-width: 1200px) { 
        top:10%;
        margin-left:30%;
        .overview{
            width:500px;
    }
    }
    @media (min-width: 1300px) { 
        top:10%;
        margin-left:30%;
        .overview{
            width:600px;
    }
    }
`
const CastObj=styled.div`
    width: 90%; 
    position: absolute; left:6%; top:5%;
    gap: 60px;
    display:flex;
    flex-wrap: wrap;

`
function MovieDetails(){
    const[cast, setCast] = useState([]);
    const {id}=useParams();
    const {state}=useLocation();
    const [loading, setLoading] = useState(true);//로딩되는 동안 cast가 생성 안 되는 오류 방지 겸...?

    useEffect(()=>{
        const fetchCasts = async () => {
            try{
                const response = await fetch(`${API}/${id}/credits?api_key=${api_key}`);
                const data = await response.json();
                setCast(data.cast);//캐스트 정보
                setLoading(false); 
            }catch (error) {    
                console.error(error);
            }
        };
        fetchCasts();
    },[id])

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
    }

    // 데이터가 존재하지 않으면 404 페이지를 렌더링
    if (!state || !state.poster_path) {
        return <NotFound />;
    }
    const avg=state.vote_average?Math.floor(state.vote_average):0;
    const overview_ment=state.overview? state.overview : "TMDB에서 제공하는 API에 상세 줄거리가 없습니다.";

    return(
        <Container backdrop_path={IMG_URL+state.backdrop_path} className='bg'>
            <Overlay />
            <Box>
                <Img src={IMG_URL+state.poster_path} alt={state.title} ></Img>
                <Info>
                    <div className='title'>{state.title}</div><br />
                    <div className='other'>평점 {Array.from({ length: avg }, ( _, i) => <span className='star'>⭐</span>)}</div><br />
                    <div className='other'>개봉일 {state.release_date}</div><br />
                    <div className='other'>줄거리  </div><br />
                    <div className='overview'>{overview_ment} </div>
                </Info>
            </Box>
            <CastBg>
                <br/><div className='title'>출연진 및 제작진</div>
                <CastObj>
                {
                cast.map((item) => {
                        return(
                            <Cast 
                                key={item.id}
                                name={item.name}
                                profile_path={item.profile_path}
                                known_for_department={item.known_for_department}
                            />
                        )
                })
                }
                </CastObj>
            </CastBg>
        </Container>
    );
}

export default MovieDetails;