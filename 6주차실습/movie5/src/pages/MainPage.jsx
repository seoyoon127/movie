import {React,useState,useEffect} from 'react'; 
import styled from 'styled-components';
import Movie from './Movies'
import useDebounce from '../useDebounce';

const searchAPI="https://api.themoviedb.org/3/search/movie";
const api_key="c5ad51876c92eece98e5cda3a82b3d8b";

const Welcome=styled.div`
  background-color:black;
  height:60%; width:100%;
  position:absolute;
  top:40px;
  text-align:center;
  line-height:200px;
  color:white;
`
const SearchMovieTitle=styled.div`
  background-color:darkBlue;
  max-width:100%;
  height:95%; width:100%;
  position:absolute;
  top:35%;
  text-align:center;
  line-height:150px;
  color:white;
`
const SearchMovieInput=styled.input`
  position:absolute;
  top:52%;
  left:38%;
  width:400px; height:30px;
  border-radius:40px;
`
const SearchMovieButton=styled.button`
  position:absolute;
  top:52%;
  left:64%;
  width:30px; height:30px;
  border-radius:50%;
  background-color:#FFD252;
`
const Load=styled.div`
  position:absolute;
  display:${props=>props.loading? 'inline':'none'};
  color:white; text-align:center; line-height:500px;
  font-size:25px; font-weight:800;
  width:960px; height:560px;
  top:62.5%; left:22.5%;
  background-color:${props=>props.loading? 'rgb(40, 40, 83)':''};
`
const BackContainer=styled.div`
  position:absolute;
  overflow:auto; /*스크롤 형성*/
  &::-webkit-scrollbar { /*스크롤바 전체*/
    width: 10px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color:#FFD252; /* 스크롤바 막대 색상 */
    border-radius: 12px ;
  } 
  background-color:${props=>props.hasMovie? 'rgb(40, 40, 83)':''};
  display:flex; flex-wrap: wrap;
  width:1200px; height:700px;
  top:55%; left:15%;
  transform: scale(0.8);
`
const MovieStyle=styled.div`
    margin:12px;

`

  export default function MainPage(){
      const [search,setSearch]=useState(""); 
      const[movies, setMovies] = useState([]); //검색창의 영화목록
      const [loading, setLoading] = useState(false); // 로딩 상태
      
      let debouncedSearch = useDebounce(search, 1000);
  
      useEffect(() => {
        if (!debouncedSearch) {
          setMovies([]); //입력값 없을 땐 검색창 비활성화(빈배열)
          return;
        }
        setLoading(true);
        const fetchMovies = async () => {
          try {
              //setLoading(true);
              console.log('호출 : '+debouncedSearch);
              const response = await fetch(`${searchAPI}?api_key=${api_key}&query=${debouncedSearch}&language=ko-KR`);
              const data = await response.json(); // JSON 형식으로 변환
              setMovies(data.results); // 쿼리값에 따라 생성된 API 주소의 결과값을 무비 배열에 추가
          } catch (error) {
              console.error(error);
          }finally{
             // 로딩 상태 해제
             setLoading(false);
          }
        };
        fetchMovies();
      },[debouncedSearch]);
  

      return(
        <div>
          <Welcome><h2>환영합니다!</h2></Welcome>
          <SearchMovieTitle><h1>🎥 Find your movies!</h1></SearchMovieTitle>
          <div>
              <span><SearchMovieInput onChange={(e)=>{setSearch(e.target.value); }}></SearchMovieInput></span>
              <span><SearchMovieButton>🔍</SearchMovieButton></span>
              <span><Load loading={loading}>로딩 중...</Load></span>
          </div>
          <BackContainer hasMovie={movies.length>0}>
            {movies.length > 0 && ( //영화목록이 비어있지 않을 때
              movies.map((item)=>(
                <MovieStyle key={item.id}>
                    <Movie 
                      title={item.title}
                      id={item.id}
                      poster_path={item.poster_path}
                      vote_average={item.vote_average}
                      backdrop_path={item.backdrop_path}
                      release_date={item.release_date}
                      overview={item.overview}
                    />
                </MovieStyle>   
              ))
            )}
          </BackContainer>
        </div>
        
      );
    }