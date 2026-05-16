const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Utilisation de l'URI définie dans le .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Local connecté via Docker");
    } catch (err) {
        console.error("❌ Erreur de connexion:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;