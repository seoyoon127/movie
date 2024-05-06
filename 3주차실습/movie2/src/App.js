import {BrowserRouter,Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Popular from "./pages/PopularPage";
import NowPlaying from "./pages/NowPlayingPage";
import TopRated from "./pages/TopRatedPage";
import Upcoming from "./pages/Upcoming";
import Header from "./components/Header";
import React from "react";
import styled from 'styled-components';

const Root=styled.div`
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
`

function App() {

  return (
  <div>
    <Root>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Popular" element={<Popular />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/TopRated" element={<TopRated />} />
          <Route path="/Upcoming" element={<Upcoming />} />
       </Routes>
      </BrowserRouter>
    </Root>
  </div>
  );
}
export default App;



