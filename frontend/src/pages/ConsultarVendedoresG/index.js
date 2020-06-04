import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2, FiPlusCircle  } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function ConsultarVendedoresG(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [vendedores, setVendedores] = useState([]);

    useEffect(()=> {
        api.get('vendedor',  {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setVendedores(response.data);
        })
    },[idGerente]);

    const history = useHistory();

    async function handleDeleteVendedor(cpfVendedor){
        try {
            await api.delete(`vendedor/${cpfVendedor}`, {
                headers:{
                    Authorization: idGerente,
                }
            });
            setVendedores(vendedores.filter(vendedor => vendedor.cpfVendedor !== cpfVendedor));
        } catch (error) { 
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="con-vendedores-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                <h1>Vendedores:</h1>
                <section className="table">
                    <table>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            
                            <th width="100">
                                <Link className="button-add" to="/CadastrarVendedor"><FiPlusCircle color="black" /></Link>
                            </th>
                        </tr>
                        {vendedores.map(vendedor =>(
                            <tr key={vendedor.cpfVendedor}>
                                <td>{vendedor.cpfVendedor}</td>
                                <td>{vendedor.nomeVendedor}</td>
                                <td>{vendedor.telefoneVendedor}</td>
                                <td>{vendedor.emailVendedor}</td>
                                
                                <td>
                                    <button><FiEdit size={20} /></button>
                                    <button><FiTrash2 size={20} onClick={()=> handleDeleteVendedor(vendedor.cpfVendedor)} /></button>
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
