import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarGerente(){

    const id = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');


    const [gerentes, setGerentes] = useState([]);
    
    useEffect(()=> {
        api.get(`gerente/${id}`, {
            headers:{
                Authorization: id,
            }
        }).then(response => {
            setGerentes(response.data);
        })
    },[id]);



    const history = useHistory();


    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-gerente-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                
                <section className="dados">
                    <h1>Seus Dados:</h1>
                    
                    {gerentes.map(gerente =>(
                        <table key={gerente.cpfGerente}>
                            <tr >
                                <td>CPF:</td>
                                <td width='100'>{gerente.cpfGerente}</td>
                            </tr>
                            <tr >
                                <td>Nome:</td>
                                <td>{gerente.nomeGerente}</td>
                            </tr>
                            <tr >
                                <td>Telefone:</td>
                                <td>{gerente.telefoneGerente}</td>
                            </tr>
                            <tr >
                                <td>Email:</td>
                                <td>{gerente.emailGerente}</td>
                            </tr>
                            <tr >
                                <td>Senha:</td>
                                <td>{gerente.senhaGerente}</td>
                            </tr>
                        </table>
                       
                            
                    ))}
                    
                </section>
                    
                <br/>
                
                <section className="button">
                    <ul>
                        <li>
                            <Link className="button" to="/ConsultarGerente">
                                <FiEdit /> Editar
                            </Link>
                        </li>
                    </ul>
                </section>
                <br />

                <section className="back">
                    <Link className="back-link" to="/ConsultarGerentesG">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Gerentes
                    </Link>
                </section> 
                
            </div>
            
                    
        </div>
    );
};
