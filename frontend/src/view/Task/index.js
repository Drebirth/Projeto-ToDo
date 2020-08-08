import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './style';
import {format} from 'date-fns';

import api from   '../../services/api';
import isConnected from '../../utils/isConnected';

//Nossos Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';


function Task({match}){//match paramentros de navegação
    const[redirect, setRedirect] = useState(false);
    const [type, setType] = useState();
    const [id,set] = useState();
    const [done, setDone] = useState(false);
    const [description,setDescription] = useState();
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();

    async function LoadTaskDetails(){
        await api.get(`/task/${match.params.id}`)
        .then(response =>{
            setTitle(response.data.title)
            setType(response.data.type)
            setDescription(response.data.description)
            setDone(response.data.done)
            setDate(format(  new Date(response.data.when),'yyyy-MM-dd'))
            setHour(format (new Date(response.data.when), 'HH:mm'))

        })
    }

    async function Save(){
        //Validacao dos dados
        if(!title){
            return alert("Voçê precosa informar o título da tarefa ")
        }else if(!description){
            return alert("Voçê precisa informar a descrição da tarefa")
        }else if(!type){
            return alert("Voçê precisa selecionar o tipo da tarefa")
        }else if(!date){
            return alert("Voçê precisa definir a data da tarefa ")
        }else if(!hour){
            return alert("Voçê precisa definir a hora da tarefa")
        }


        if(match.params.id){
            await api.put(`/task/${match.params.id}`,{
                macaddress: isConnected,
                done,
                type,
                title,
                description,
                when:`${date}T${hour}:00.000`
            }).then(()=>
                setRedirect(true)
            )
        }else{
            await api.post('/task',{
                macaddress: isConnected,
                type,
                title,
                description,
                when: `${date}T${hour}:00.000`
            }).then(() =>
            setRedirect(true)        
            )}
    }
        
    async function Remove(){
        const res = window.confirm('Deseja realmente remover a tarefa?')
        if(res === true){
            await api.delete(`/task/${match.params.id}`)
            .then(()=> setRedirect(true))
        }
    }
    
        
    useEffect(() =>{
        if (!isConnected){
            setRedirect(true)
        }
        LoadTaskDetails();
    },[LoadTaskDetails] )

    return (
    <S.Container>
      { redirect &&  <Redirect to="/"/>}  
        <Header/>

        <S.Form>
            <S.TypeIcons>
                {
                    TypeIcons.map((icon, index) => (
                        index > 0 &&
                        <button type="button" onClick={() => setType(index)}>
                            <img src={icon} alt="Tipo da Tarefa" 
                            className={type && type != index && 'inative'}/>
                            </button>
                            ))
                        }
            </S.TypeIcons>

            <S.Input>
                <span>Título</span>
                <input type="text" placeholder="Título da Tarefa"
                 onChange={e =>setTitle(e.target.value)} value={title} />
            </S.Input>


            <S.TextArea>
                <span>Descrição</span>
                <textarea rows={5} placeholder="Detalhes da Tarefas"
                onChange={e => setDescription(e.target.value)} value={description} />
            </S.TextArea>

            <S.Input>
                <span>Data</span>
                <input type="date" placeholder="Título da Tarefa" 
                onChange={e => setDate(e.target.value)} value={date}/>
            </S.Input>

            <S.Input>
                <span>Hora</span>
                <input type="time" placeholder="Título da Tarefa" 
                onChange={e => setHour(e.target.value)} value={hour}/>
            </S.Input>

            <S.Option>
                <div>
                    <input type="checkbox" checked={done} onChange={() =>setDone(!done)} />
                    <span>Concluído</span>
                </div>

             {match.params.id && <button type="button" onClick={Remove} >EXCLUIR</button> }   
            </S.Option>
            
            <S.Save>
                <button type="button" onClick={Save}>SALVAR</button>
            </S.Save>
        </S.Form>

       
        
        <Footer/>
    </S.Container>
    )
}


export default Task;
