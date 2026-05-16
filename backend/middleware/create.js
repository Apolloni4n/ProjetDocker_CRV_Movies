const User = require('../models/User');

const create = async (req, res) => {
    // 1. Le mouchard : on affiche ce que React envoie
    console.log("📥 Requête reçue sur /insert :", req.body); 

    const { email, movie } = req.body;

    try {
        // Sécurité 1 : Vérifier qu'on a bien reçu les données
        if (!email || !movie) {
            console.log("❌ Erreur : Email ou film manquant depuis le frontend");
            return res.status(400).json({ message: "Email ou film manquant" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Création d'un nouvel utilisateur si c'est son premier film
            user = new User({ email, watchlist: [movie] });
        } else {
            // Sécurité 2 : Si la watchlist est cassée ou nulle, on la répare
            if (!user.watchlist || !Array.isArray(user.watchlist)) {
                user.watchlist = [];
            }

            // Sécurité 3 : On cherche sans crasher si un item est null
            const alreadyExists = user.watchlist.find(item => item && item.movieId === movie.movieId);
            
            if (alreadyExists) {
                console.log("⚠️ Le film est déjà dans la liste");
                return res.status(400).json({ message: "Ce film est déjà dans votre watchlist" });
            }
            
            user.watchlist.push(movie);
        }

        // Sauvegarde dans MongoDB
        await user.save();
        console.log("✅ Film sauvegardé avec succès dans MongoDB !");
        res.status(201).json({ message: "Film ajouté avec succès !" });

    } catch (error) {
        // 2. Le vrai rapport de crash : ça s'affichera dans ton terminal Docker !
        console.error("❌ CRASH dans create.js :", error.message);
        res.status(500).json({ message: "Erreur lors de l'ajout", error: error.message });
    }
};

module.exports = create;