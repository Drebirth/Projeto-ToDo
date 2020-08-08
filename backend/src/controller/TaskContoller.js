const TaskModel = require('../model/TaskModel');
const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns')
const current = new Date();//captura a data é a hora atual
const { response } = require('express');

class TaskController {

   async create(req, res){
       const task = new TaskModel(req.body);//Pedi os paramentros pelo corpo da requisicao
    await task.save()//se tudo de certo ele salva
    .then(response => {
        return res.status(200).json(response);//é retornar o status 200
    })
    .catch(error => {
        return res.status(500).json(error);//se nao ele retornar o erro 500
    });
    }
    
    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body,{new:true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
        
    }

    async all(req,res){
        await  TaskModel.find({macaddress: {'$in': req.params.macaddress}})
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response=>{
            if(response){
                return res.status(200).json(response);
            }else{
                return res.status(404).json({error: 'tarefa não encontrada!'})
            }
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async done(req, res){//seria tipo um check box
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id },
            {'done': req.params.done},
            {new: true})
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async late(req, res){
        await TaskModel
        .find({
          'when': {'$lt': current},
          'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when')
        .then( response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        });
      }

    async today(req,res){
        await TaskModel.find({'macaddress': {'$in': req.params.macaddress},
                'when': {'$gte': startOfDay(current), '$lt': endOfDay(current)}//aqui vamos pegar datas iguais ou maior ou datas iguais ou menor do dia
            })
            .sort('when')
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }
    
    async week(req, res){//tarefas da semana
        await TaskModel.find({'macaddress': {'$in': req.params.macaddress},
    'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
    })
    .sort('when')
    .then(response =>{
        return res.status(200).json(response);
    })
    .catch(error =>{
        return res.status(500).json(error);
    });
    }

    async month(req, res){
        await TaskModel.find({'macaddress': {'$in': req.params.macaddress},
    'when':{'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
    })
    .sort('when')
    .then(response =>{
        return res.status(200).json(response)
    })
    .catch(error =>{
        return res.status(500).json(error);
    })
    }

    async year(req, res){
        await TaskModel.find({'macaddress': {'$in': req.params.macaddress},
        'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
    })
    .sort('when')
    .then(response =>{
        return res.status(200).json(response)
    })
    .catch( error => {
        return res.status(500).json(error);
    })
    }
}

module.exports = new TaskController();