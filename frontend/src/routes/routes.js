import React from 'react';
import {Route,BrowserRouter,Switch} from 'react-router-dom';

import Home from '../view/Home';
import Task from '../view/Task';
import Qrcode from '../view/QrCode';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/task" exact component={Task}/>
            <Route path="/task/:id" component={Task}/>
            <Route path="/qrcode" component={Qrcode}/>
        </Switch>
        </BrowserRouter>
    )
}