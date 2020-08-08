const TaskModel = require('../model/TaskModel');

const {isPast} = require('date-fns');//verificação se a data esta no passado!
const TaskValidation = async (req, res, next)=>{

    const {macaddress, type, title, description, when} = req.body;//Vai fazer a validação dos arquivos enviados antes de enviar 

    if( ! macaddress){
        return res.status(400).json({error: 'macaddress é obrigatório!'});
    }else if( !type){
        return res.status(400).json({error: 'Tipo é obrigatório'});
    }else if(!title){
        return res.status(400).json({error: 'Título é obrigatório'});
    }else if(!description){
        return res.status(400).json({error: 'Descrição obrigatória'});
    }else if(!when){
        return res.status(400).json({error: 'Data e Hora são obrigatórios'});
    }
    else{
        let exists;

        if(req.params.id){//Verificação se a tarefa ja existe, então assim pode atualisa-la
            exists = await TaskModel.findOne(
                {
                    '_id': {'$ne': req.params.id},//$ne operador de negação no mongoDB
                    'when': {'$eq': new Date(when)},
                    'macaddress': {'$in': macaddress}
                });
        }else{
             if( isPast(new Date(when)))//conversao de string para date
        return res.status(400).json({error: 'Escolha uma data e hora futura'});
        exists = await TaskModel//aqui ele chama o task de nosso model e vai buscar alguma atividde que possua a mesma data é hora
        .findOne({'when': {'$eq': new Date(when)},//usando o campo when,com o operador $eq, lê-se equals, o new date seria para converter o formato string pra data
        'macaddress': {'$in': macaddress}//verificar o macaddress para fazer a verificacao de tempo, é o $in para ver se o valor esta contido nesse
        
        });
    }
    if(exists){
        return res.status(400).json({error: 'Já existe uma tarefa nesse dia!'})
    }


        next();
    }
//temos que fazer uma verificação para que nao seja salva mais de uma tarefa ao mesmo tempo
//Através desse arquivo já podemos fazer a validacao por data 
//Para evitar o cadastramento de arquivos no passado com date-fns
}

module.exports = TaskValidation;