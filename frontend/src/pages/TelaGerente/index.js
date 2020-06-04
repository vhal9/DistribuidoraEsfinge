import React,{useEffect, useState}  from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiEdit, FiSearch, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

import './styles.css';
import api from '../../services/api';


export default function Gerente(){
    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [compras, setCompras] = useState([]);

    const history = useHistory();
    
    useEffect(()=> {
        api.get('compra', {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setCompras(response.data);
        })
    },[idGerente]);


    async function handleDeleteCompra(idCompra){
        try {
            await api.delete(`compra/${idCompra}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setCompras(compras.filter(compra => compra.idCompra !== idCompra))
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className="gerente-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <h1>Compras:</h1>
            <section className="table">
                <table>
                    <tr>
                        <th>Fornecedor</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th width="100"></th>
                    </tr>
                    {compras.map(compra =>(
                        <tr key={compra.idCompra}>
                            <td>{compra.nomeFornecedor}</td>
                            <td>{compra.dataCompra}</td>
                            <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(compra.totalCompra)} </td>
                            <td>
                                <button><FiSearch size={20} /></button>
                                <button><FiEdit size={20} /></button>
                                <button onClick={()=> handleDeleteCompra(compra.idCompra)}><FiTrash2 size={20} /></button>
                            </td>
                        </tr>
                    ))}

                </table>
                
            </section>
            <section className="menu">
                <ul>
                    <li>
                        <Link className="button" to="/CadastrarCompra">Nova Compra</Link>
                    </li>
                    <li>
                        <Link className="button" to="/ConsultarProdutosG">Produtos</Link>
                    </li>
                    <li>
                        <Link className="button" to="/ConsultarFornecedoresG">Fornecedores</Link>
                    </li>
                
                    <li>
                        <Link className="button" to="/ConsultarClientesG">Clientes</Link>
                    </li>
                    <li>
                        <Link className="button" to="/ConsultarVendedoresG">Vendedores</Link>
                    </li>
                    <li>
                        <Link className="button" to="/ConsultarGerentesG">Gerentes</Link>
                    </li>
                </ul>
            </section>
                    
        </div>
    );
};
