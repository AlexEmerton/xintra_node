var express = require('express');
var url = require('url');
var mysql = require('mysql');
var papers = require('../models/papers');
var papers_pic = require('../models/papers_pic');
var modules = require('../models/modules');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var modules_l = [];
  var topics__ism = [];
  var topics_no_form__ism = [];
  var topics__pic = [];
  var topics_no_form__pic = [];

  // // GET A LIST OF ALL TOPICS FOR PIC
  // papers_pic.getAllTopics(function(err, content) {
  //   if(err) {
  //     throw err;
  //   } else {
  //     for (var i = 0; i<content.length; i++){
  //       topics__pic.push(content[i].TOPIC);
  //       topics_no_form__pic.push(content[i].TOPIC)
  //     }
  //     topics__pic = JSON.stringify(topics__pic);
  //     // console.log(topics__pic)
  //   }
  // });

  // GET A LIST OF ALL MODULES
  modules.getAll(function(err, content){
    if(err){
      throw err;
    } else {
      for (var x = 0; x<content.length; x++){
        modules_l.push([content[x].name, content[x].code]);
      }
      // console.log(modules_l);
    }

    // GET A LIST OF ALL TOPICS FOR PIC
    papers_pic.getAllTopics(function(err, content) {
      if(err) {
        throw err;
      } else {
        for (var i = 0; i<content.length; i++){
          topics__pic.push(content[i].TOPIC);
          topics_no_form__pic.push(content[i].TOPIC)
        }
        topics__pic = JSON.stringify(topics__pic);
        // console.log(topics__pic)
      }

      // GET A LIST OF ALL TOPICS FOR ISM
      papers.getAllTopics(function(err, content) {
        if(err) {
          throw err;
        } else {
          for (var i = 0; i<content.length; i++){
            topics__ism.push(content[i].TOPIC);
            topics_no_form__ism.push(content[i].TOPIC)
          }
          topics__ism = JSON.stringify(topics__ism);
          // console.log(topics__ism);
        }

        res.render('index', {
          title: 'Xintra | Home',
          "topics__ism": topics__ism,
          "topics_no_form__ism": topics_no_form__ism,
          "topics__pic": topics__pic,
          "topics_no_form__pic": topics_no_form__pic,
          "modules": modules_l
        });
      });
    });
  });
});

module.exports = router;
