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
import CadastrarGerente from './pages/CadastrarGerente';


import ConsultarProdutosG from './pages/ConsultarProdutosG';
import ConsultarFornecedoresG from './pages/ConsultarFornecedoresG';
import ConsultarClientesG from './pages/ConsultarClientesG';
import ConsultarVendedoresG from './pages/ConsultarVendedoresG';
import ConsultarGerentesG from './pages/ConsultarGerentesG';
import ConsultarGerente from './pages/ConsultarGerente';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PaginaInicial}/>

                <Route path="/LoginGerente" component={LoginGerente}/>
                <Route path="/LoginVendedor" component={LoginVendedor}/>
                
                
                <Route path="/TelaGerente" component={TelaGerente}/>

                <Route path="/CadastrarVendedor" component={CadastrarVendedor}/>
                <Route path="/CadastrarGerente" component={CadastrarGerente}/>
                <Route path="/CadastrarCliente" component={CadastrarCliente}/>
                <Route path="/CadastrarProduto" component={CadastrarProduto}/>
                <Route path="/CadastrarFornecedor" component={CadastrarFornecedor}/>
                <Route path="/CadastrarCompra" component={CadastrarCompra}/>
                
                <Route path="/ConsultarProdutosG" component={ConsultarProdutosG}/>
                <Route path="/ConsultarFornecedoresG" component={ConsultarFornecedoresG}/>
                <Route path="/ConsultarClientesG" component={ConsultarClientesG}/>
                <Route path="/ConsultarGerentesG" component={ConsultarGerentesG}/>
                <Route path="/ConsultarGerente" component={ConsultarGerente}/>
                <Route path="/ConsultarVendedoresG" component={ConsultarVendedoresG}/>


                <Route path="/TelaVendedor" component={TelaVendedor}/>

                <Route path="/CadastrarVenda" component={CadastrarVenda}/>

            </Switch>
        </BrowserRouter>
    )
}