var db = require('../db.js')

exports.getAll = function(done){
  db.get().query('SELECT * FROM modules ORDER BY name ASC', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
