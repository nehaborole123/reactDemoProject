import MovieCard from "../component/movieCard";
import { useState , useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home(){

    const [ searchQuery , setSearchQuery ] =useState("");

    const [movies ,setMovies] = useState([]);

    const [setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []); // Dependency array

    const handleSearch = async(e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return
        setLoading(true)

        try{
            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)
        }catch(err){
            console.log(err);
            setError("Failed to search movie");
        }finally{
            setLoading(false);
        }
    }

    return <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies" 
                    className="search-input"  
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="search-button"
                > 
                Search 
                </button>

            </form>
            
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
    </div>

}

export default Home;