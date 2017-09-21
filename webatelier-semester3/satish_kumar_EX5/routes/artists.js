// router, routes and logic for /artists (model Artist)

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
require("../models/Artist")
var Artist = mongoose.model("Artist")

router.get("/", function (req, res) {

    Artist.find({}, function (err, docs) {
        if (!(req.accepts("application/json"))) {
           res.end()
        } else {
             if (!docs) res.status(404)
            res.json(docs);
            
        }
    })

})

router.get("/:id", function (req, res) {

    Artist.findById(req.params.id, function (err, doc) {
        if (!(req.accepts("application/json"))) {
            res.end()
        } else {
            if (!doc) res.status(404)
            res.json(doc);
            
        }
    })

})

router.delete("/:id", function (req, res) {

    Artist.findById(req.params.id, function (err, doc) {
        if (!doc) {
            res.status(404)
            res.end()
            
        } else {
            doc.remove(function (err, removed) {
                res.end()
            })
        }

    })
})

router.post("/", function (req, res) {
    if (!req.body.name) res.status(400)

    var artist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        artwork: req.body.artwork,
        dateCreated: req.body.dateCreated
    })
    
    res.json(artist);
})

var bodyValid = function (req,res) {
    if (!req.body.name) {
        res.status(400)
    }
}


router.post("/", function (req, res) {
    bodyValid(req, res)

    var artist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        artwork: req.body.artwork,
        dateCreated: req.body.dateCreated
    })

    res.json(artist);
})

router.put("/:id", function (req, res) {
    bodyValid(req, res)

    Artist.findByIdAndUpdate(req.params.id, req.body, {upsert: true}, function(err, doc){
        res.end()
    })

})

module.exports = router;