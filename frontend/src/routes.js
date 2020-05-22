import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PaginaInicial from './pages/PaginaInicial';
import LoginGerente from './pages/LoginGerente';
import LoginVendedor from './pages/LoginVendedor';
import Vendedor from './pages/Vendedor';
import Gerente from './pages/Gerente';

import CadastrarCliente from './pages/CadastrarCliente';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial}/>
                <Route path="/LoginGerente" component={LoginGerente}/>
                <Route path="/LoginVendedor" component={LoginVendedor}/>
                <Route path="/Vendedor" component={Vendedor}/>
                <Route path="/Gerente" component={Gerente}/>
                <Route path="/CadastrarCliente" component={CadastrarCliente}/>
            </Switch>
        </BrowserRouter>
    )
}