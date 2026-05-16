const express = require('express');
const router = express.Router();


// Imports des middlewares
const create = require('../middleware/create'); 
const read = require('../middleware/read');
const readapi = require("../middleware/readapi"); 
const readone = require("../middleware/readone"); 
const deletefile = require("../middleware/delete");

// Routes
router.post('/api/add', create.createdata || create); 
router.post('/api/insert', create.createdata || create);
router.get('/api/read', read.readdata || read);
router.get('/api/readapi', readapi.apidata || readapi);
router.get('/api/read/:id', readone.readone || readone);
router.delete('/api/delete/:id', deletefile.deletedata || deletefile);

module.exports = router;