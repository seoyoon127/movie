import { BrowserRouter,Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import MainPage from "./pages/MainPage.jsx";
import Popular from "./pages/PopularPage.jsx";
import NowPlaying from "./pages/NowPlayingPage.jsx";
import TopRated from "./pages/TopRatedPage.jsx";
import Upcoming from "./pages/Upcoming.jsx";
import Navbar from "./component/Navbar.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Popular" element={<Popular />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/TopRated" element={<TopRated />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/:id" element={<MovieDetails />} />
          <Route path="/*" element={<NotFound />} />
       </Routes>
      </BrowserRouter>
    </Root>
  </div>
  );
}
export default App;


