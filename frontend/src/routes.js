import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PaginaInicial from './pages/PaginaInicial';

// Paginas de Login
import LoginGerente from './pages/LoginGerente';
import LoginVendedor from './pages/LoginVendedor';

//Paginas iniciais
import TelaVendedor from './pages/TelaVendedor';
import TelaGerente from './pages/TelaGerente';

//Paginas de cadastro de entidades

import CadastrarVendedor from './pages/CadastrarVendedor';
import CadastrarCliente from './pages/CadastrarCliente';
import CadastrarProduto from './pages/CadastrarProduto';
import CadastrarFornecedor from './pages/CadastrarFornecedor';
import CadastrarCompra from './pages/CadastrarCompra';
import CadastrarVenda from './pages/CadastrarVenda';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial}/>

                <Route path="/LoginGerente" component={LoginGerente}/>
                <Route path="/LoginVendedor" component={LoginVendedor}/>
                
                
                <Route path="/TelaGerente" component={TelaGerente}/>

                <Route path="/CadastrarVendedor" component={CadastrarVendedor}/>
                <Route path="/CadastrarCliente" component={CadastrarCliente}/>
                <Route path="/CadastrarProduto" component={CadastrarProduto}/>
                <Route path="/CadastrarFornecedor" component={CadastrarFornecedor}/>
                <Route path="/CadastrarCompra" component={CadastrarCompra}/>
                

                <Route path="/TelaVendedor" component={TelaVendedor}/>
                
                <Route path="/CadastrarVenda" component={CadastrarVenda}/>

            </Switch>
        </BrowserRouter>
    )
}