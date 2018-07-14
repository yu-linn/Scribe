const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
var slack = require('./tools/use_slack.js');
var stt = require('./tools/speech-to-text.js');
var ttn = require('./tools/textToNotesNew.js');
var cache; // Save output from textToNotee to send it to wherever

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index', {
        text: "Enter text to be summarised here:"
    });
});

app.get('/filename', function(req, res) {
    var entry = req.query.filenameinput; // Full file path as entered by the user
    console.log("file=" + entry);
    stt.audiofile_to_text(entry, function(text_data) {
        ttn.textToNotes(text_data, function(markdown) {
            res.render('index', {
                text: markdown
            });
	    cache = markdown;
        });
    });
});

app.get('/slack/:text', function(req, res) {
    var markdown = req.params.text;
    console.log(cache);
    slack.send_to_slack(cache);
});

app.listen(5000);
