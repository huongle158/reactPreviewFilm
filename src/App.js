import { Fragment } from "react";
import MovieCard from "./components/movie/MovieCard";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import 'swiper/scss'
import HomePage from "./pages/HomePage";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={
          <Main></Main>
        }>
          {/* Phải sử dụng Outlet thì no mới ăn vì đây Route con */}
          <Route path="/" element={
            <>
              <HomePage></HomePage>
            </>
          }>
          </Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}>
          </Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>

        </Route>
      </Routes>
    </Fragment >
  );
}

export default App;
