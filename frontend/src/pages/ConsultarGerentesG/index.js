import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2, FiPlusCircle  } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarGerentesG(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');
    
    const [gerentes, setGerentes] = useState([]);

    useEffect(()=> {
        api.get('gerente',  {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setGerentes(response.data);
        })
    },[idGerente]);

    const history = useHistory();

    async function handleDeleteGerente(cpfGerente){
        try {
            await api.delete(`gerente/${cpfGerente}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setGerentes(gerentes.filter(gerente => gerente.cpfGerente !== cpfGerente));
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-gerentes-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                <h1>Gerentes:</h1>
                <section className="table">
                    <table>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            
                            <th width="100">
                                <Link className="button-add" to="/CadastrarGerente"><FiPlusCircle color="black" /></Link>
                            </th>
                        </tr>
                        {gerentes.map(gerente =>(
                            <tr key={gerente.cpfGerente}>
                                <td>{gerente.cpfGerente}</td>
                                <td>{gerente.nomeGerente}</td>
                                <td>{gerente.telefoneGerente}</td>
                                <td>{gerente.emailGerente}</td>
                                
                                <td>
                                    <button><FiEdit size={20} /></button>
                                    <button><FiTrash2 size={20} onClick={()=> handleDeleteGerente(gerente.cpfGerente)} /></button>
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
