const mongoose = require('../config/database'); // Pega a conexao com o banco de dados

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    macaddress:{
        type:String, 
        required: true
    },//Armazenar o endereço fisico do computador no bd
    type:{
        type:Number, 
        required:true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    when:{
        type: Date,
        required:true
    },
    done: {//Campo definido por padrao pra falso, a tarefa sempre esta false ate que se marca o contrario
        type:Boolean,
        default: false
    },
    create:{// a hora da criacao da atividade
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task', TaskSchema);
