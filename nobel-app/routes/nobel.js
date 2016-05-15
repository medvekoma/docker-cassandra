var express = require('express');
var router = express.Router();

const cassandra = require('cassandra-driver')
const client = new cassandra.Client({ contactPoints: ['node1'], keyspace: 'meetup'});

/* GET by year. */
router.get('/year/:year', function(req, res, next) {
  var year = parseInt(req.params.year)
  console.log("Year: " + year)
  const cql = 'SELECT * FROM nobel_laureates WHERE year=?';
  client.execute(cql, [year], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates in ' + year, result)
  });
});

/* GET by country. */
router.get('/country/:code', function(req, res, next) {
  var code = req.params.code.toUpperCase()
  console.log("Country code: " + code)
  const cql = 'SELECT * FROM nobel_laureates WHERE borncountrycode=?';
  client.execute(cql, [code], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates from ' + code, result)
  });
});

function renderResult(res, err, title, result){
  if (err) {
    console.log(">>> Error: " + err)
    res.render('index', {title: 'Error!'})
  } else {
    res.render('nobel', { title: title, rows: result.rows });
  }
}

module.exports = router;
