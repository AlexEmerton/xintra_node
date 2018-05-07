var db = require('../db.js')

var result = [];

exports.getAll = function(done) {
  db.get().query('SELECT * FROM papers_pic ORDER BY topic ASC', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllByTopic = function(topic, callback) {
  db.get().query('SELECT * FROM papers_pic WHERE topic = ?', topic, function (err, rows) {
    if (err) {
      callback(err)
    } else {
      callback(null, rows)
    }
  });
}

exports.getAllTopics = function(done){
  db.get().query('SELECT DISTINCT TOPIC FROM papers_pic', function (err, rows) {
    if (err) return done(err)
    // console.log(rows)
    done(null, rows)
  })
}
