import React,{useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiEdit, FiSearch, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';


import api from '../../services/api';

import './styles.css';



export default function TelaVendedor(){

    const history = useHistory();

    const idVendedor = localStorage.getItem('cpfVendedor');
    const vendedorNome = localStorage.getItem('nomeVendedor');

    const [vendas, setVendas] = useState([]);

    useEffect(()=> {
        api.get('venda', {
            headers:{
                Authorization: idVendedor,
            }
        }).then(response => {
            setVendas(response.data);
        })
    },[idVendedor]);

    async function handleDeleteVenda(idVenda){
        try {
            api.delete(`venda/${idVenda}`, {
                headers:{
                    Authorization: idVendedor,
                }
            });
            setVendas(vendas.filter(venda => venda.idVenda !== idVenda))
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className="vendedor-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {vendedorNome}</span>

                <Link className="button" to="/">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <h1>Vendas:</h1>
            <section className="table">
                <table>
                    <tr>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th width="100"></th>
                    </tr>
                    {vendas.map(venda =>(
                        <tr key={venda.idVenda}>
                            <td>{venda.nomeFantasiaCliente}</td>
                            <td>{venda.dataVenda}</td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(venda.totalVenda)}</td>
                            <td>
                                <button><FiSearch size={20} /></button>
                                <button><FiEdit size={20} /></button>
                                <button onClick={()=> handleDeleteVenda(venda.idVenda)}><FiTrash2 size={20} /></button>
                            </td>
                        </tr>
                    ))}
                    
                    

                </table>
                
            </section>
            <section className="menu">
                <ul>
                    <li>
                        <Link className="button" to="/CadastrarVenda">Nova Venda</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Produtos</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Clientes</Link>
                    </li>
                </ul>
            </section>
                    
        </div>
    );
};
