const User = require('../models/User');

const deletedata = async (req, res) => {
    try {
        const idToRemove = req.params.id;

        await User.updateMany(
            {},
            { 
                $pull: { 
                    watchlist: { 
                        $or: [
                            { movieId: Number(idToRemove) },
                            { movieId: String(idToRemove) },
                            { _id: idToRemove } 
                        ]
                    } 
                } 
            }
        );

        console.log("Film retire de la watchlist avec succes");
        res.status(200).json({ message: "Film supprime avec succes" });

    } catch (error) {
        console.error("Erreur dans delete.js :", error.message);
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};

module.exports = { deletedata };
