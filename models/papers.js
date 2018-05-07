var db = require('../db.js')

// exports.create = function(userId, text, done) {
//   var values = [userId, text, new Date().toISOString()]
//
//   db.get().query('INSERT INTO comments (user_id, text, date) VALUES(?, ?, ?)', values, function( err, result) {
//     if (err) return done(err)
//     done(null, result.insertId)
//   })
// }

var result = [];

exports.getAll = function(done) {
  db.get().query('SELECT * FROM papers ORDER BY topic ASC', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.getAllByTopic = function(topic, callback) {
  db.get().query('SELECT * FROM papers WHERE topic = ?', topic, function (err, rows) {
    if (err) {
      callback(err)
    } else {
      callback(null, rows)
    }
  });
}

exports.getAllTopics = function(done){
  db.get().query('SELECT DISTINCT TOPIC FROM papers', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.searchTopics = function(s_query, done){
  db.get().query('SELECT DISTINCT TOPIC FROM papers WHERE TOPIC like "%' + s_query + '%"', function (err, rows) {
    if (err) {
      done(err)
    } else {
      done(null, rows)
    }
  });
}
