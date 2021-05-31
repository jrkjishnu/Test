const { response } = require('express');
var express = require('express');
const candidateHandler = require('../Handler/candidateHandler');
const { addCandidate } = require('../Handler/candidateHandler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/candidate',(req,res)=>
{

  candidateHandler.addCandidate(req.body).then((response)=>
  {
    console.log(response);
  })
})

module.exports = router;
