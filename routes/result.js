var express = require('express');
var url = require('url');
var mysql = require('mysql');
var papers = require('../models/papers');
var papers_pic = require('../models/papers_pic')
var pdfjsLib = require('pdfjs-dist');
var fs = require('fs');

var app = express();
var router = express.Router();
var pdfPath = '../pdfs/ism_exam_2012.pdf';

/* GET home page. */
router.get('/', function(req, res, next) {
  // Identify the URL query by split the whole thing between the '?' and '&' symbols

  var mod = req.query.mod;
  var topic = req.query.topic;
  var years = [];
  var questions = [];
  var pages = [];
  var query = [];

  // mod = JSON.stringify(mod);
  console.log(mod);

  if (mod == 'ism') {

    // Get all entries by topic for ISM topics
    papers.getAllByTopic(topic, function(err, content) {
      if(err) {
        console.log(err);
      } else {
        // For each entry capture the year and question number
        for (var i = 0; i < content.length; i++){
          years.push(content[i].year);
          questions.push(content[i].question);
          pages.push(content[i].page);
          query.push([content[i].year, content[i].question, content[i].page]);
          // console.log(query);
        }
        mod = JSON.stringify(mod);
        res.render('result', { title: 'Xintra | Search results', query: query, 'mod': mod, 'topic': topic});
      }
    });

  } else if (mod == 'pic') {

    // Get all entries by topic for PIC topics
    papers_pic.getAllByTopic(topic, function(err, content) {
      if(err) {
        console.log(err);
      } else {
        // For each entry capture the year and question number
        for (var i = 0; i < content.length; i++){
          years.push(content[i].year);
          questions.push(content[i].question);
          pages.push(content[i].page);
          query.push([content[i].year, content[i].question, content[i].page]);
          // console.log(query);
        }
        mod = JSON.stringify(mod);
        res.render('result', { title: 'Xintra | Search results', query: query, 'mod': mod, 'topic': topic});
      }
    });

  } else {
    res.render('result', { title: 'Xintra | Search results', error: 'Incorrect module selected!'});
  }

});

module.exports = router;
