import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarForcenecedor(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    
    const [cnpjFornecedor, setCnpjFornecedor] = useState('');
    const [nomeFornecedor, setNomeFornecedor] = useState('');
    const [telefoneFornecedor, setTelefoneFornecedor] = useState('');
    const [emailFornecedor, setEmailFornecedor] = useState('');
    

    const history = useHistory();



    async function handleNewFornecedor(e){
        e.preventDefault();

        const data = {

            cnpjFornecedor,
            nomeFornecedor,
            telefoneFornecedor,
            emailFornecedor,
        
        };
        try {
            await api.post('fornecedor', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Fornecedor Cadastrado com sucesso.')
            history.push('/gerente')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }



    return(
        <div className="cad-fornecedor-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                
                <section className="form">
                    <h1>Cadastrar Fornecedor:</h1>
                    <form onSubmit={handleNewFornecedor}>
                        <input 
                            placeholder="CNPJ"
                            value={cnpjFornecedor}
                            onChange={e => setCnpjFornecedor(e.target.value)}
                        />
                        
                        <input 
                            placeholder="Nome"
                            value={nomeFornecedor}
                            onChange={e => setNomeFornecedor(e.target.value)}
                        />
                        <input 
                            placeholder="Telefone"
                            value={telefoneFornecedor}
                            class="form-control phone-ddd-mask"
                            
                            onChange={e => setTelefoneFornecedor(e.target.value)}    
                        />
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={emailFornecedor}
                            onChange={e => setEmailFornecedor(e.target.value)}
                        />
                        
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <br />
                    <Link className="back-link" to="/gerente">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Início
                    </Link>
                    
                </section>
            </div>
            
                    
        </div>
    );
};
