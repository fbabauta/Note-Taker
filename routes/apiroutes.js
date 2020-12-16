const router = require("express").Router();
var fs = require("fs");
var db = require("../db/db");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", function(req, res) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: db.length + 1
        };
        db.push(newNote);
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        console.log(req.params)
        db = db.filter(note => note.id !== parseInt(req.params.id))
        console.log(db)
        res.json(db)
    });

};