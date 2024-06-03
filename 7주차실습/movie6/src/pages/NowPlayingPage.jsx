import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Movie from './Movies';

const All = styled.div`
  background-color: darkblue;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const BackContainer = styled.div`
  width: 1200px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 70px 0;
`;

function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c5ad51876c92eece98e5cda3a82b3d8b&language=ko-KR&page=${page}`
      );
      const data = await response.json();
      if (response.ok) { //요청이 성공적일때
        setMovies(prevMovies => [...prevMovies, ...data.results]);//이전 배열 preMovies와 현재 새로운 데이터를 병합함
      } else {
        console.error('Response not ok:', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <All>
      <BackContainer>
        {movies.map((item) => (
          <Movie
            key={item.id}
            title={item.title}
            id={item.id}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            backdrop_path={item.backdrop_path}
            release_date={item.release_date}
            overview={item.overview}
          />
        ))}
      </BackContainer>
      {loading && <div>Loading...</div>}
    </All>
  );
}

export default NowPlayingPage;
