const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var ObjectId = require('mongodb').ObjectID;

//-----------mongoose tutorial ---//
var mongoose = require('mongoose');

 
mongoose.connect('mongodb://localhost:27017/mean', function (err) {
    if (err) throw err;  
    console.log('Successfully connected');
});

var movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: '',
    title: '',
    year: '',
    genres: '',
    runtime: '',
    plot: '',
    originalLanguage: '',
    director: '',
    writer: '',
    mainCast: '',
    rating:'',
    nuniReview: '',
    funFact: '',
    seen: '',
    images: '',
    created: { 
        type: Date,
        default: Date.now
    }
});

var Movie = mongoose.model('Movie', movieSchema);

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

//Post Movie
router.post('/postMovie', (req, res) => {
   connection((db) => {
        db.collection('AllMovies').insert(req.body)
        .then((reser) => {
            response.data = reser;
            res.json(response);
            //res.send(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
                   
    });
})

//Put Movie
router.put('/modifyExistentMovie/:id', (req, res) => {
    var movie = req.body
    connection((db) => {
        db.collection('AllMovies').findOneAndReplace( 
            { "_id" : ObjectId(movie.id)},            
            movie,
            {returnNewDocument: true, returnOriginal: false, new: true})
        .then((reser) => {
            response.data = reser;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
                    
    });
 })


module.exports = router;