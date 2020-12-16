const router = require("express").Router();
var fs = require("fs");


// require data array from db.json
const jsonData = require("../db/db");

module.exports = function (app) {

     // GET - get api data
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    // POST - post new entry to api
    app.post("/api/notes", function(req, res) {
        
        // push new entry into jsonData array, render array id's
        let newNote = req.body;
        jsonData.push(newNote);
        renderDataID(jsonData);

        // write a new file using the updated jsonData array
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err
        });

        res.json(newNote);
    });

    // DELETE - delete entry from API
    app.delete("/api/notes/:id", function(req, res) {
        let deleteNoteID = req.params.id;

        // delete entry who's id matches the requested id
        for (var i = 0; i < jsonData.length; i++) {
            if (deleteNoteID == jsonData[i].id) {
                jsonData.splice(i, 1);
            }
        }

        renderDataID(jsonData);

        // write new file using the updated jsonData array
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err
        });

        res.json(deleteNoteID);
    });
};

// renders id property of the objects in the jsonData array
function renderDataID(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].id = i + 1;
    }
}