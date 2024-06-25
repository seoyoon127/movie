import {React,useState,useEffect} from 'react'; 
import styled from 'styled-components';
import Movie from './Movies';
import useDebounce from '../useDebounce';

const searchAPI="https://api.themoviedb.org/3/search/movie";
const api_key="c5ad51876c92eece98e5cda3a82b3d8b";

const Welcome=styled.div`
  background-color:black;
  height:60%;
  position:absolute;
  width:100%;
  text-align: center;
  line-height:250px;
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
const Search=styled.div`
  position: relative;  
  width: 100%;
  height: 100vh;     
  display: flex;
  justify-content: center; 
  align-items: center;
  
`
const SearchMovieInput=styled.input`
  color:black;
  position:relative; 
  width:350px; height:25px;
  border-radius:40px;

  @media (min-width: 768px) { 
      width:400px; height:30px;
  }
`
const SearchMovieButton=styled.button`
  position:absolute;
  width:30px; height:30px;
  border-radius:50%;
  background-color:#FFD252;
  margin-left:400px;

  @media (min-width: 768px) { 
    width:30px; height:30px;
    margin-left:450px;
  }
`
const Load=styled.div`
  color:white;
  width:200px;
  background-color:pink;
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
  
  display:flex; flex-wrap: wrap;
  width:1200px; height:700px;
  top:50%; 
  transform: scale(0.8);
  width:600px; height:700px;

  @media (min-width: 768px) { 
      width:900px; 
  }
  @media (min-width: 1024px) { 
      width:1200px;
  }
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
        
        const fetchMovies = async () => {
          if (!debouncedSearch) return;
          setLoading(true); // 로딩 상태 설정
          try {
              console.log('호출 : '+debouncedSearch);
              const response = await fetch(`${searchAPI}?api_key=${api_key}&query=${debouncedSearch}&language=ko-KR`);
              const data = await response.json(); // JSON 형식으로 변환
              setMovies(data.results); // 쿼리값에 따라 생성된 API 주소의 결과값을 무비 배열에 추가
          } catch (error) {
              console.error(error);
          }finally{
            setLoading(false); // 로딩 상태 해제
          }
        };
        fetchMovies();
      },[debouncedSearch]);

      const [id,setId]=useState('');

      useEffect(() => { 
        const storedId = localStorage.getItem("id");
      setId(storedId || '');

        const handleStorageChange = () => {
          const updatedId = localStorage.getItem("id");
          setId(updatedId || '');
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
        
    }, []);
      return(
        <div>
          <Welcome><h2>{id?`${id}님 환영합니다!`:'환영합니다'}</h2></Welcome>
          <SearchMovieTitle><h1>🎥 Find your movies!</h1></SearchMovieTitle>
          <Search>
              <SearchMovieInput onChange={(e)=>{setSearch(e.target.value); }}></SearchMovieInput>
              <SearchMovieButton>🔍</SearchMovieButton>
              <BackContainer >
          {movies.length > 0 && ( //영화목록이 비어있지 않을 때
            movies.map((item)=>(
              <MovieStyle key={item.id}>
                  <Movie 
                    title={item.title}
                    poster_path={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    vote_average={item.vote_average}
                    backdrop_path={item.backdrop_path}
                    release_date={item.release_date}
                    overview={item.overview}
                  />
              </MovieStyle>   
            ))
          )}
        </BackContainer>
            </Search>
          <span><Load>로딩 중...</Load></span>
          {loading&&<span>로딩 중 입니다.</span>} 
        </div>
        
      );
    }