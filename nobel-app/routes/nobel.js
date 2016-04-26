var express = require('express');
var router = express.Router();

const cassandra = require('cassandra-driver')
const client = new cassandra.Client({ contactPoints: ['seed1'], keyspace: 'ks1'});

function renderResult(res, err, title, result){
  if (err) {
    console.log(">>> Error: " + err)
    res.render('index', {title: 'Error!'})
  } else {
    res.render('nobel', { title: title, rows: result.rows });
  }
}

/* GET by year. */
router.get('/year/:year', function(req, res, next) {
  var year = parseInt(req.params.year)
  console.log("Year: " + year)
  const query = 'SELECT * FROM nobel_laureates WHERE year=?';
  client.execute(query, [year], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates in ' + year, result)
  });
});

/* GET by country. */
router.get('/country/:code', function(req, res, next) {
  var code = req.params.code.toUpperCase()
  console.log("Country code: " + code)
  const query = 'SELECT * FROM nobel_laureates WHERE borncountrycode=?';
  client.execute(query, [code], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates from ' + code, result)
  });
});
module.exports = router;
