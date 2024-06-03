import React from "react";
import {useEffect, useState} from 'react'
import Movie from './Movies'
import styled from 'styled-components';
import Pagination from './Pagination';

const All=styled.div`
  background-color:darkblue;  
  display: flex;
  justify-content: center;
`
const BackContainer = styled.div`
width: 1200px;
gap: 18px;
display: flex;
flex-wrap: wrap;
margin: 20px 0 120px 0;
`;
const Page=styled.div`
  color:white;
  display: flex;
  font-size:20px;
  font-weight:800;
`
const LeftBar=styled.div`
  position:absolute;  
  left:35%;
  top:272%;
  &:hover{
    cursor:pointer;
  }
  &.cant{ //부모요소 참조:&
    color:rgba(255,255,255,0.5);
  }
`
const RightBar=styled.div`
  position:absolute;  
  left:55%;
  top:272%;
  &:hover{
    cursor:pointer;
  }
`
const PageNum=styled.div`
  position:absolute;  
  left:45%;
  top:272%;
`

function PopularPage(){

  const[movies, setMovies] = useState([]);

const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const limit = 1; // 한 번에 보여줄 페이지 번호 수

  // 페이지 변경 시 URL 생성
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=c5ad51876c92eece98e5cda3a82b3d8b&language=ko-KR&page=${page}`;

  useEffect(() => {
    let isMounted = true; // 마운트 상태를 추적하기 위한 플래그

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
        if (response.ok) {
          const result = await response.json();
          if (isMounted) {
            setData(result);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그 업데이트
    };
  }, [url,page]);

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
      <Pagination 
        data={data}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Page>
          <LeftBar className={page === 1 ? 'cant' : ''} onClick={()=>{if(page!==1)setPage(page-1);}} >&lt;</LeftBar>
          <PageNum>{page}</PageNum>
          <RightBar onClick={()=>{setPage(page+1);}} className={`${page===1?'cant':''}`}>&gt;</RightBar>
      </Page>
    </All>
  );
}

export default PopularPage;
