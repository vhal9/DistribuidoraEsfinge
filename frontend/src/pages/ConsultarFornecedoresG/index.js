import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2, FiPlusCircle  } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarFornecedoresG(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(()=> {
        api.get('fornecedor',  {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setFornecedores(response.data);
        })
    },[idGerente]);

    const history = useHistory();

    async function handleDeleteFornecedor(cnpjFornecedor){
        try {
            await api.delete(`fornecedor/${cnpjFornecedor}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setFornecedores(fornecedores.filter(fornecedor => fornecedor.cnpjFornecedor !== cnpjFornecedor))
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-fornecedores-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                <h1>Fornecedores:</h1>
                <section className="table">
                    <table>
                        <tr>
                            <th>CNPJ</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            
                            <th width="100">
                                <Link className="button-add" to="/CadastrarFornecedor"><FiPlusCircle color="black" /></Link>
                            </th>
                        </tr>
                        {fornecedores.map(fornecedor =>(
                            <tr key={fornecedor.cnpjFornecedor}>
                                <td>{fornecedor.cnpjFornecedor}</td>
                                <td>{fornecedor.nomeFornecedor}</td>
                                <td>{fornecedor.telefoneFornecedor}</td>
                                <td>{fornecedor.emailFornecedor}</td>
                                <td>
                                    <button><FiEdit size={20} /></button>
                                    <button><FiTrash2 size={20} onClick={()=> handleDeleteFornecedor(fornecedor.cnpjFornecedor)} /></button>
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
