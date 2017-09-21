

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
require("../models/Track")
var Track = mongoose.model("Track")

router.get("/", function (req, res) {

    Track.find({}, function (err, docs) {
        if (!(req.accepts("application/json"))) {
            res.end()
        } else {
            if (!docs) res.status(404)
            res.json(docs);
            
        }
    })

})

router.get("/:id", function (req, res) {

    Track.findById(req.params.id, function (err, doc) {
        if (!(req.accepts("application/json"))) {
           res.end()
        } else {
             if (!doc) res.status(404)
            res.json(doc);
            
        }

    })

})

router.delete("/:id", function (req, res) {

    Track.findById(req.params.id, function (err, doc) {
        if (!doc) {
            res.status(404).end()
        } else {
            doc.remove(function (err, removed) {
                res.end()
            })
            
        }

    })
})

var validateRequestBody = function (req, res) {
    if (!req.body.artist || !req.body.name || !req.body.duration || !req.body.file || !req.body.dateCreated || !req.body.dateReleased) {
        res.status(400)
    }
}
var bodyValid = function (req,res) {
    if (!req.body.artist || !req.body.name || !req.body.duration || !req.body.file || !req.body.dateCreated || !req.body.dateReleased) {
        res.status(400)
    }
}


router.post("/", function (req, res) {
    bodyValid(req, res)

    var track = new Track({
        name: req.body.name,
        artist: req.body.artist,
        duration: req.body.duration,
        file: req.body.file,
        album: req.body.album,
        id3Tags: req.body.id3Tags,
        dateCreated: req.body.dateCreated,
        dateReleased: req.body.dateReleased
    })

    res.json(track);
})

router.put("/:id", function (req, res) {
    bodyValid(req, res)

    Track.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true
    }, function (err, doc) {
        res.end()
    })

})

module.exports = router;