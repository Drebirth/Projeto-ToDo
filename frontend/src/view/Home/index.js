import React, {useState, useEffect} from 'react';
import {Link, Redirect} from  'react-router-dom';
import * as S from './style';

import api from   '../../services/api';
import isConnected from '../../utils/isConnected';

//Nossos Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FIlterCard';
import TaskCard from '../../components/TaskCard';

function Home(){
    const [filterActived, setFilterActived] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [redirect,setRedirect] = useState(false);
   

    async function loadTasks(){
        await api.get(`/task/filter/${filterActived}/${isConnected}`).then(response =>{
            setTasks(response.data);
        })
    }



    function Notification(){
        setFilterActived('late');
    }

    useEffect(() =>{
        loadTasks();

        if(! isConnected){
            setRedirect(true);
        }
    },[filterActived, loadTasks] )

    return (
    <S.Container>
       { redirect && <Redirect to="/qrcode"/> } 
        <Header clickNotification={Notification} />

        <S.FilterArea>
        <button type="button"  onClick={()=> setFilterActived("all")}>
        <FilterCard title="Todos" actived={filterActived === 'all'} />
        </button>

        <button type="button"  onClick={() => setFilterActived("today")}>
        <FilterCard title="Hoje" actived={filterActived === 'today'}  />
        </button>

        <button type="button" onClick={() => setFilterActived("week")}>
        <FilterCard title="Semana" actived={filterActived === 'week'}   />
        </button>

        <button type="button" onClick={() => setFilterActived("month")}>
        <FilterCard title="Mês" actived={filterActived === 'month'}/>
        </button>

        <button type="button"  onClick={() => setFilterActived("year")}>
        <FilterCard title="Ano" actived={filterActived === 'year'}  />
        </button>

        </S.FilterArea>

        <S.content>
            <S.Title>
                 <h3>{filterActived === 'late' ? 'Tarefas Atrasadas' : 'Tarefas'  }</h3>{/*se filter for igual a late entao mostrar tarefas atrasadas se nao so tarefas*/ }
        
            </S.Title>
            {//Percorre item por item dentro da coleção
                tasks.map(t =>(
                    <Link to={`/task/${t._id}`} >
                    <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
                    </Link>
                    ))
            }
           
        </S.content>
        
        <Footer/>
    </S.Container>
    )
}


export default Home;
