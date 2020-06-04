import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2, FiPlusCircle  } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarClientesG(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [clientes, setClientes] = useState([]);

    useEffect(()=> {
        api.get('cliente',  {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setClientes(response.data);
        })
    },[idGerente]);

    const history = useHistory();

    async function handleDeleteCliente(cnpjCliente){
        try {
            await api.delete(`cliente/${cnpjCliente}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setClientes(clientes.filter(cliente => cliente.cnpjCliente !== cnpjCliente));
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-clientes-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                <h1>Clientes:</h1>
                <section className="table">
                    <table>
                        <tr>
                            <th>CNPJ</th>
                            <th>Nome Fantasia</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Endereco</th>
                            
                            
                            <th width="100">
                                <Link className="button-add" to="/CadastrarCliente"><FiPlusCircle color="black" /></Link>
                            </th>
                        </tr>
                        {clientes.map(cliente =>(
                            <tr key={cliente.cnpjCliente}>
                                <td>{cliente.cnpjCliente}</td>
                                <td>{cliente.nomeFantasiaCliente}</td>
                                <td>{cliente.telefoneCliente}</td>
                                <td>{cliente.emailCliente}</td>
                                <td>{cliente.enderecoCliente}</td>
                                <td>
                                    <button><FiEdit size={20} /></button>
                                    <button><FiTrash2 size={20} onClick={()=> handleDeleteCliente(cliente.cnpjCliente)} /></button>
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
