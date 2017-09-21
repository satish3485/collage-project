
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

require("../models/User")
require("../models/Playlist")

var Playlist = mongoose.model("Playlist")
var User = mongoose.model("User")

router.get("/", function (req, res) {

    User.find({}, function (err, docs) {
        if (!(req.accepts("application/json"))) {
            res.end()
        } else {
            if (!docs) res.status(404)
            res.json(docs);
            
        }
    })
})

router.get("/:id", function (req, res) {

    User.findById(req.params.id, function (err, doc) {
        if (!(req.accepts("application/json"))) {
            res.end()
        } else {
            if (!doc) res.status(404)
            res.json(doc);
            
        }
    })

})

router.get("/:id/playlists", function (req, res) {
    User.findById(req.params.id, function (err, doc) {
        if (!(req.accepts("application/json"))) {
           res.end() 
        } else {
            if (!doc || err) {
                res.status(404).json()
            } else {
                Playlist.find({
                    "_id": {
                        $in: doc.playlists
                    }
                }, function (err, docs) {
                    res.json(docs)
                })
            }
            
        }
    })
})

router.put("/:id/playlists", function (req, res) {

    var notFound = false

    for (var i in req.body) {
        if (!req.body[i].name) {
            notFound = true
            break
        }
    }

    User.findById(req.params.id, function (err, doc) {
        if (!doc || err) {
            res.status(404).end()

        } else {
            if (notFound) {
                res.status(400).end()
            } else {
                doc.playlists = req.body
                doc.save(function (err) {
                    res.end()
                })
            }
        }
    })

    User.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true
    }, function (err, doc) {
        res.end()
    })
})

router.delete("/:id", function (req, res) {

    User.findById(req.params.id, function (err, doc) {
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

var validateRequestBody = function (req, res) {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        res.status(400)
    }
}
var bodyValid = function (req,res) {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        res.status(400)
    }
}


router.post("/", function (req, res) {

    bodyValid(req, res)

    var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        dateCreated: req.body.dateCreated,
        playlists: req.body.playlists,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    res.json(user);
})

router.put("/:id", function (req, res) {
    bodyValid(req, res)

    delete req.body.password

    User.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (!doc) {
            console.log("NO USER")

            var newUser = new User(req.body)

            console.log(newUser)

            newUser.save(function (err) {
                res.status(201).end()
            })

        } else {
            res.end()
        }
    })

})

module.exports = router;