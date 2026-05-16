import { useState, useEffect } from "react";
import "./Accueil.css";

export default function Accueil({ onConnexion }) {
  const [pseudo, setPseudo] = useState("");
  const [erreur, setErreur] = useState("");


  const connexion = () => {
    const val = pseudo.trim();
    if (val.length < 3) { 
      setErreur("Au moins 3 caractères."); 
      return; 
    }
    localStorage.setItem("pseudo", val);
    onConnexion(val);
  };

  return (
    <div>
      <div className="titre">🎬 Connexion 🎥</div>
      <input
        type="text"
        placeholder="Ton pseudo..."
        value={pseudo}
        autoFocus
        onChange={(e) => { setPseudo(e.target.value); setErreur(""); }}
        onKeyDown={(e) => e.key === "Enter" && connexion()}
      />
      {erreur && <p>{erreur}</p>}
      <button onClick={() => connexion()}>Accéder</button>
    </div>
  );
}