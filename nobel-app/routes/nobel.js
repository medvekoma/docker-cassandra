var express = require('express');
var router = express.Router();

const cassandra = require('cassandra-driver')
const client = new cassandra.Client({ contactPoints: ['node1'], keyspace: 'nobel'});

/* GET by year. */
router.get('/year/:year', function(req, res, next) {
  var year = parseInt(req.params.year)
  console.log("Year: " + year)
  const cql = 'SELECT * FROM laureates WHERE year=?';
  client.execute(cql, [year], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates in ' + year, result, row => row.category)
  });
});

/* GET by country. */
router.get('/country/:code', function(req, res, next) {
  var code = req.params.code.toUpperCase()
  console.log("Country code: " + code)
  const cql = 'SELECT * FROM laureates WHERE borncountrycode=?';
  client.execute(cql, [code], {prepare: true}, function(err, result) {
    renderResult(res, err, 'Laureates from ' + code, result, row => row.year)
  });
});

function renderResult(res, err, title, result, selector){
  if (err) {
    console.log(">>> Error: " + err)
    res.render('index', {title: 'Error!'})
  } else {
    var rows = result.rows.sort(compareBy(selector));
    res.render('nobel', { title: title, rows: rows });
  }
}

function compareBy(selector) {
  var comparer = function(one, two){
    var a = selector(one)
    var b = selector(two)
    if (a < b)
      return -1;
    else if (a > b)
      return 1;
    else
      return 0;
  }
  return comparer;
}

module.exports = router;
