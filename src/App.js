import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const MoviePage = React.lazy(() => import("./pages/Movies/MoviePage"));

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<Homepage/>} />
            <Route path='movies'>
              <Route index element={<MoviePage/>} />
              <Route path=':id' element={<MovieDetailPage/>} />
            </Route>
          </Route>

          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
    </div>
  );
}

export default App;
