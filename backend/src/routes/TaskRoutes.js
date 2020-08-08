const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskContoller');
const TaskValidation = require('../middlewares/TaskValidation');

router.get('/filter/year/:macaddress',  TaskController.year);
router.get('/filter/month/:macaddress',  TaskController.month);
router.get('/filter/week/:macaddress',  TaskController.week);
router.get('/filter/today/:macaddress', TaskController.today);
router.get('/filter/late/:macaddress',  TaskController.late);
router.get('/filter/all/:macaddress', TaskController.all);
//Passando o id por params

router.put('/:id/:done', TaskController.done)
router.delete('/:id', TaskController.delete);
router.get('/:id', TaskController.show);
router.put('/:id',TaskValidation, TaskController.update);
router.post('/', TaskValidation, TaskController.create );// Para fazer a intercepcao do conteudo com o middleware 
//basta colocar antes da criacao no banco de dados;

module.exports = router;