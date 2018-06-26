const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
    if (err) return console.log(err);

    let db = client.db('Movies');
    closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//Do more end points qwer
// Get movies
router.get('/allMovies', (req, res) => {
    connection((db) => {
        db.collection('AllMovies')
            .find()
            .toArray()
            .then((movies) => {
                response.data = movies;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//Post Movies
router.post('/postMovie', (req, res) => {
    connection((db) => {
        db.collection('AllMovies').insert(req.body)
        .then(contestacion => {
            response.data = contestacion;
            response.message = res;
        })
                   
    });
})


module.exports = router;