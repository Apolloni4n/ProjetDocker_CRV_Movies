const User = require('../models/User');

const readdata = async (req, res) => {
    try {
        const { email } = req.query; 

        if (!email) {
            return res.status(400).json({ message: "Email de l'utilisateur manquant" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json([]);
        }

        res.status(200).json(user.watchlist);

    } catch (error) {
        console.error("❌ Erreur dans read.js :", error);
        res.status(500).json({ error: "Erreur lors de la récupération de la watchlist" });
    }
};

module.exports = { readdata };