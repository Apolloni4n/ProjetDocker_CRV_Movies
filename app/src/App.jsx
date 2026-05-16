import { useEffect, useState } from "react";
import "./App.css";
import Accueil from "./Accueil";
import { PopupModal } from "./PopupModal"; 
import { Search } from "./Search";

function App() {
  
  const [recherche, setRecherche] = useState("");
  const [movies, setMovies] = useState([]);
  const [pseudo, setPseudo] = useState(null);
  const [favorites, setFav] = useState([]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieToPrint = movies.map(movie => {
    const imgSrc = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : "https://via.placeholder.com/500x750?text=No+Image";

    return (
      <div key={movie.id} className="projects-container2">
        <div className="project_item">
          <div className="project-container-item" onClick={() => { setSelectedMovie(movie); setShowPopup(true); }}>
            <div className="image_item">
              <img src={imgSrc} alt="project" />
            </div>
            <div className="rating"> 
              <img alt="star" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEoElEQVRoge2Z3W8UZRTGf2eWtlBEgtJu+dIQGhED8iEsCbAbqiYSolxqIglcGk0oiNyZGLjwjiuIfwAYb42JIaBeEGMw8YOYFjEkRAhSoFAt0m7blLLv48XutjPb2e7OMqOJ6bnYd949857nOXOeOfPOLszarM1aYqbLHRn92rElSQxLKrB60u2k7DoABa209XfvJYHjJRG0GNneA1oRraXjRCyRCuhqZwvj+RtI6eIXDJBveta29Y3FjZVMBcZH9vnIA7Qxf2JvElCxJyBhyB1ClMgLJEBHpPgrHn8FLnXsQrwAFImXE5FW09v2WtxwCUhIh4uDStPShwDH+3GjxVpS9aTXgnon4/rJQykpb4NtutcTF2a8FZA+AKwkGaaTB1Q4GCdkbBVQT7oddAMxN0AcKuU0jmylbf7zThy48VVA7sA08lLYvdACvBsXbCwV0PfL59E6/geweLpkJj/8iQ3S3PSMrb878rjYkROQMH5rS1PQMpRaClqO2I6013/SFOFqcrLPwF0A+nDuNl7zLbYM3DULnB09AV1qX0UqtQyxAqclYMtRYRnYUmAFUgfQFEpQPuwIPk35JhD9wE2k20K3PNSHszuYu4lL9Vn2wbWqCejy0mPIfRQA8Q01ZNGQT6o4N7RzTflMOmrZ/LHyN3P8CSB3DRDCgqX3B62YhxGs06fo6wTedT/lQBeytf2nkO0HTQQ7SRXy4V2mpk9SdfLV1xVMvGPZodMBzoSYetOvAp8jLQgE8g3/lmRKMUZN3puWGzpTybVqF9IvHVvw3BlE238oGYBBE3ssN3whjOeMbVSX2ldR0DlEZwAkDKi+LhNpHeKGFdhlXcNXqnGs+RzQj20dNHEWaUMAxDfUL5mZ1k1L7LIVCrusa6xvJn41txKWGeinmSzYN4ErVI28zxcqmarrAuS/tfGm7bXIQ4Qnsa52tjD09ymktwIEKgn6iYf46pDhFzYn/7Zto67350hbCQnj4uLjyB0OEPAPjUsGGZ94O/LdZrh6OTW0mdNPi04gOxBTlymSh5OpXL47Kpc5tU8JMZGPUTJlG26ESmMJYFvL4I8jGb/P0NZGmER+oZHwkDYXjxvuMmG+jI5G5xP9jeyHp56X9GQDe5kpn0J9C+h6YnXyCchlJslVfXGvQr7sK88rfU6ZqHQiJ+A8ZWKRTHnuO3blixPBIt/E5iwTucvUcRODMEeyFdB55oLWhUtmmpwGDbrN0Q0MVq8IU9UyXixiJJQALQs2IZqnk/DJSTiJTy3FGsvlT9rO/EnzUp2CE4hHNeTUTGHexuQSIJWZscug84bbmMoN77Pt+cl/ZCz74H5q58hBw1sHnA2XWmnuot0HkRJwlR1oUhZ203D7vWz+ZcuN9FZbb13DV7yu0d0m9iB+nyLPZDJOllwCBpmKqzciZ8fs0dBzlh05PeNif5xXRr+0hWNrTO4QMOSXk1m0Vlr/dvq7hYtk+gtkCCc45anwoeVGH+s3Tp1rXeJSjz422X7AQ8gmxp+217lfz/r6E/gqPV+toxeBfjPviO148HOjpEPjf920WfKOg9L28OFL9gajccaftVn7v9o/fzB7l3fCLDkAAAAASUVORK5CYII=" />
              <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <p>{movie.title}</p>
          </div>
          <button id='addtowatchlist' onClick={() => AddFav(movie)}> + Favoris</button>
        </div>
      </div>
    );
  });
  
  const favToPrint = favorites.map(fav => (
    <div key={fav.movieId || fav._id} className="projects-container2">
      <div className="project_item">
        <div className="project-container-item" onClick={() => { setSelectedMovie({id: fav.movieId, image: fav.image}); setShowPopup(true); }}>
          <div className="image_item">
             <img src={fav.image || "https://via.placeholder.com/500x750?text=No+Image"} alt="project" />
          </div>
          <p>{fav.title}</p>
        </div>
        <button id='addtowatchlist' onClick={() => delFav(fav._id || fav.movieId)}> - Retirer</button>
      </div>
    </div>
  ));

  const AddFav = (movie) => {
    const imageUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : "https://via.placeholder.com/500x750?text=No+Image";

    fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: pseudo,
        movie: {
          movieId: movie.id,
          title: movie.title,
          image: imageUrl,
          imDbRating: movie.vote_average
        }
      })
    })
    .then(res => res.json())
    .then(data => readFav())
    .catch(err => console.log(err));
  };

  const delFav = (id) => {
    fetch(`/api/delete/${id}`, { method: "DELETE" })
    .then(data => readFav());
  };

  const readFav = () => {
    fetch(`/api/read?email=${pseudo}`)
      .then(res => res.json())
      .then(data => setFav(data))
      .catch(err => console.log(err));
  };

  const deconnexion = () => {
    localStorage.removeItem("watchlist_pseudo");
    setPseudo(null);
    setMovies([]);
  };

  useEffect(() => {
    if (!pseudo) return;
    console.log("NEW AAA");
    fetch("/api/Top250Movies")
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(err => console.log(err));
    readFav();
  }, [pseudo]);

  if (!pseudo) {
    return <Accueil onConnexion={setPseudo} />;
  }

  return (
    <div className="app">
      <button className="deco" onClick={() => deconnexion()}>Se deconnecter</button>
      <div className="titre">🎬 Catalogue de films 🎥</div>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />  
      
      {recherche !== "" ? (
        <Search 
          email={pseudo}
          setadded={readFav} 
          query={recherche} 
        />
      ) : (
        <div className="projects sectionpadding" id='portfolio'>
          <div className="projects_container">
            {movies.length === 0 && <p>Chargement des films...</p>}
            {movieToPrint}
          </div>
        </div>
      )}
      
      <h2 style={{marginTop: '40px', color: 'white'}}>Favoris</h2>
      <div className="projects sectionpadding" id='portfolio'>
        <div className="projects_container">
          {favorites.length === 0 && <p>Aucun favori pour le moment.</p>}
          {favToPrint}
        </div>
      </div>

      {showPopup && (
        <PopupModal 
          setShowPopup={setShowPopup} 
          dValue={selectedMovie} 
        />
      )}
    </div>
  );
}

export default App;