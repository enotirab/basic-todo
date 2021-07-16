var express = require('express');
var router = express.Router();



const middlewareTest = ( req, res, next) => {
    res.locals.moment =  require('moment');
    next();
};

const todoController = require('../controllers/todoController');

router.get('/', middlewareTest, todoController.listAll);
router.get('/addItem', todoController.displayAddItem);
router.post('/addItem', todoController.addNewItem);
router.get('/editItem/:id', todoController.viewEditItem);
router.post('/editItem/:id', todoController.saveEditItem);
router.post('/deleteItem/:id', todoController.deleteItem);
router.post('/completeItem/:id', todoController.makeItemComplete);
router.post('/incompleteItem/:id', todoController.markeItemIncomplete);



module.exports = router;
