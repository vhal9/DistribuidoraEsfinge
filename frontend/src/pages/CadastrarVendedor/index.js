import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarVendedor(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [cpfVendedor, setCpfVendedor] = useState('');
    const [nomeVendedor, setNomeVendedor] = useState('');
    const [telefoneVendedor, setTelefoneVendedor] = useState('');
    const [emailVendedor, setEmailVendedor] = useState('');
    const [senhaVendedor, setSenhaVendedor] = useState('');

    const history = useHistory();

    async function handleNewVendedor(e){
        e.preventDefault();

        const data = {
            cpfVendedor,
            nomeVendedor,
            telefoneVendedor,
            emailVendedor,
            senhaVendedor,
        };
        try {
            await api.post('vendedor', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Vendedor cadastrado com sucesso.')
            history.push('/vendedores')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="cad-vendedor-container">
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
                    <h1>Cadastrar produto:</h1>
                    <form onSubmit={handleNewVendedor}>
                        
                        <input 
                            placeholder="CPF"
                            value={cpfVendedor}
                            onChange={e => setCpfVendedor(e.target.value)}
                        />
                        <input 
                            placeholder="Nome"
                            value={nomeVendedor}
                            onChange={e => setNomeVendedor(e.target.value)}
                        />
                        <input 
                            placeholder="Telefone"
                            value={telefoneVendedor}
                            onChange={e => setTelefoneVendedor(e.target.value)}    
                        />
                        <input 
                            type="email"
                            placeholder="Email"
                            value={emailVendedor}
                            onChange={e => setEmailVendedor(e.target.value)}
                        />
                        <input
                            placeholder="Senha"
                            value={senhaVendedor}
                            onChange={e => setSenhaVendedor(e.target.value)}

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
