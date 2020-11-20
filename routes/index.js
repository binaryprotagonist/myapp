var express = require('express');
var router = express.Router();
const userController = require('./../controller/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/totalUsers', function(req, res, next) {
  userController.getAllUsers()
  .then((resp) => {
    res.send(resp);
  })
  .catch(err=>{
    res.status(500).send(err)

  })

});

router.get('/totalUniqueUsers', function(req, res, next) {
  userController.getUniqueUsers()
  .then((resp) => {
    res.send(resp);
  })
  .catch(err=>{
    res.status(500).send(err)

  })

});

router.get('/filterUsersByDate', function(req, res, next) {
 // console.log(req.body)
  userController.filterUser(req)
  .then((resp) => {
    res.send(resp);
  })
  .catch(err=>{
    res.status(500).send(err)

  })

});
router.get('/filterUniqueUsers', function(req, res, next) {
  // console.log(req.body)
   userController.filterUniqueUserByDate(req)
   .then((resp) => {
     res.send(resp);
   })
   .catch(err=>{
     res.status(500).send(err)
 
   })
 
 });

module.exports = router;
