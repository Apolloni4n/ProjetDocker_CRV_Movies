const express = require("express");
const cors = require('cors');
const axios = require('axios');
const util = require('util');
require('dotenv').config();


const TMDB_API_KEY = process.env.TMDB_API_KEY;
const port = process.env.PORT || 3001;

// Patch global pour éviter les erreurs de TextEncoder avec MongoDB
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
global.globalThis = global;

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Connexion Base de données ---
// Assure-toi que ton fichier mongodb.js se connecte bien à process.env.MONGO_URI
const connectDB = require('./mongodb'); 
connectDB(); // C'est cette ligne qui manquait pour lancer la connexion !

// URL de base de l'API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


app.use('/', require("./routes/routes"));

if (!TMDB_API_KEY) {
    console.error("❌ TMDB_API_KEY manquante");
}
// 1. Recherche de films
app.get('/api/SearchTitle/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=fr-FR`);
        res.json(response.data);
    } catch (error) {
        console.error("Erreur TMDB /SearchTitle :", error.message);
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
});

// 2. Top 250 Films
app.get('/api/Top250Movies', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Erreur lors de la récupération du Top" });
    }
});

// 3. Détails d'un film
app.get('/api/Title/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`);
        res.json(response.data);
    } catch (error) {
        console.error("Erreur TMDB /Title :", error.message);
        res.status(500).json({ error: "Erreur lors des détails" });
    }
});

// 4. Images du film
app.get('/api/Images/:id/Short', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/images?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error("Erreur TMDB /Images :", error.message);
        res.status(500).json({ error: "Erreur lors des images" });
    }
});
app.get('/api/Reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur Reviews" });
    }
});

app.get('/api/Recommendations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}&language=fr-FR`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur Recommendations" });
    }
});
// LANCEMENT DU SERVEUR
app.listen(port, () => {
    console.log(`🚀 Backend connecté et en écoute sur le port ${port}`);
});