const { response } = require('express');
var express = require('express');
const candidateHandler = require('../Handler/candidateHandler');
const { addCandidate } = require('../Handler/candidateHandler');
const testscoreHandler = require('../Handler/testscoreHandler');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/candidate',(req,res)=>
{

  candidateHandler.addCandidate(req.body).then((response)=>
  {
    res.send({added:true})
  }).catch((response)=>
  {
    res.send({added:false})
  })
})

router.post('/testscore',(req,res)=>
{
  testscoreHandler.addScore(req.body).then((resolve)=>
  {
    res.send({added:true})
  }).catch((response)=>
  {
    res.send({added:false})
  })
})

router.get('/total',(req,res)=>
{
  testscoreHandler.getScores().then((response)=>
  {
    res.send({response})
  }).catch((response)=>
  {
    res.send({response})
  })
})

module.exports = router;
