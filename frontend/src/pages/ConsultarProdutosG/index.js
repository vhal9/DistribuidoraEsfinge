import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2, FiPlusCircle  } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarProdutosG(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [produtos, setProdutos] = useState([]);

    useEffect(()=> {
        api.get('produto',  {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setProdutos(response.data);
        })
    },[idGerente]);

    const history = useHistory();

    async function handleDeleteProduto(idProduto){
        try {
            await api.delete(`produto/${idProduto}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setProdutos(produtos.filter(produto => produto.idProduto !== idProduto));
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-produtos-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                <h1>Produtos:</h1>
                <section className="table">
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Estoque</th>
                            <th>Preço</th>
                            <th width="100">
                                <Link className="button-add" to="/CadastrarProduto"><FiPlusCircle color="black" /></Link>
                            </th>
                        </tr>
                        {produtos.map(produto =>(
                            <tr key={produto.idProduto}>
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.marcaProduto}</td>
                                <td>{produto.estoqueProduto}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(produto.precoAtualProduto)}</td>
                                <td>
                                    <button><FiEdit size={20} /></button>
                                    <button><FiTrash2 size={20} onClick={() => handleDeleteProduto(produto.idProduto)} /></button>
                                </td>
                            </tr>
                        ))}
                        
                        

                    </table>
                    
                </section>
                <section>
                    <br />
                    <Link className="back-link" to="/TelaGerente">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Início
                    </Link>
                    
                </section>
                
            </div>
            
                    
        </div>
    );
};
