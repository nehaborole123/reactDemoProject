import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import NavBar from './component/NavBar';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
<MovieProvider>
      <NavBar />
        <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favourites" element={<Favourite/>}/>
        </Routes>

      </main>
</MovieProvider>
  )
}

export default App
