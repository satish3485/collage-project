
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

require("../models/Album")
var Album = mongoose.model("Album")
var ObjectId = mongoose.Schema.Types.ObjectId;

var bodyValid = function (req) {
    if (!req.body.artist || !req.body.name || !req.body.dateReleased) {
        return false;
    } else {
        return true;
    }
}

router.get("/", function (req, res) {
    var filter = {};
  if (req.query.artist) {
    filter.artist = req.query.artist;
  }
  if (req.query.name) {
    filter.name = req.query.name;
  }
  if (req.query.dateReleased) {
    filter.dateReleased = req.query.dateReleased;
  }
 
    Album.find(filter, function (err, found) {
        if (err) throw err

        if (!(req.accepts("application/json"))) {
            res.end()
            
        } else {
            if (!found) res.status(404)
            res.json(found);
        }

    })

})
router.get("/:id", function (req, res) {

    Album.findById(req.params.id, function (err, docs) {
        if (err) throw err;

        if (!(req.accepts("application/json"))) {
            res.end()
            
        } else {
            if (!docs) res.status(404)
            res.json(docs);
        }
    })

})

router.delete("/:id", function (req, res) {

    Album.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) throw err;

        if (docs) {
            res.status(204)
            res.end()
            
        } else {
            res.status(404)
            res.end()
        }
    })
})


router.post("/", function (req, res) {
    if (bodyValid(req)) {
        var album = new Album({
        
        artist: req.body.artist,
        name: req.body.name,
        artwork: req.body.artwork,
        tracks: req.body.tracks || [],
        dateCreated: req.body.dateCreated || Date.now,
        dateReleased: req.body.dateReleased,
        label: req.body.label
    })
        // res.status(201).json(album);
        album.save(function (err) {
                res.status(201).json(album)
        })
        
    } else {
        res.status(400)
        res.end()
    }

})

router.put("/:id", function (req, res) {

    if (bodyValid(req)) {
        Album.findByIdAndUpdate(req.params.id, req.body, function (err, docs) {
            if (docs) {
                res.status(204)
                res.end()
            } else {
                var newAlbum = new Album({
                artist: req.body.artist,
                name: req.body.name,
                artwork: req.body.artwork,
                tracks: req.body.tracks || [],
                dateCreated: req.body.dateCreated || Date.now,
                dateReleased: req.body.dateReleased,
                label: req.body.label
    })

                newAlbum.save(function (err) {
                    res.status(201).json(newAlbum)
                })
                
            }
        })

    } else {
        res.status(400)
        res.end()
    }

})

module.exports = router;