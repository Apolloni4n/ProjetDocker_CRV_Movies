const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Un seul compte par email
    },
    // La Watchlist est un tableau d'objets
    watchlist: [{
        movieId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String },
        description: { type: String },
        addedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', UserSchema);