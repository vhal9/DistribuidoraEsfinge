import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarGerente(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [cpfGerente, setCpfGerente] = useState('');
    const [nomeGerente, setNomeGerente] = useState('');
    const [telefoneGerente, setTelefoneGerente] = useState('');
    const [emailGerente, setEmailGerente] = useState('');
    const [senhaGerente, setSenhaGerente] = useState('');

    const history = useHistory();

    async function handleNewGerente(e){
        e.preventDefault();

        const data = {
            cpfGerente,
            nomeGerente,
            telefoneGerente,
            emailGerente,
            senhaGerente,
        };
        try {
            await api.post('gerente', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Gerente cadastrado com sucesso.')
            history.push('/ConsultarGerentesG')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="cad-gerente-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {gerenteNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                
                <section className="form">
                    <h1>Cadastrar gerente:</h1>
                    <form onSubmit={handleNewGerente}>
                        
                        <input 
                            placeholder="CPF"
                            value={cpfGerente}
                            onChange={e => setCpfGerente(e.target.value)}
                        />
                        <input 
                            placeholder="Nome"
                            value={nomeGerente}
                            onChange={e => setNomeGerente(e.target.value)}
                        />
                        <input 
                            placeholder="Telefone"
                            value={telefoneGerente}
                            onChange={e => setTelefoneGerente(e.target.value)}    
                        />
                        <input 
                            type="email"
                            placeholder="Email"
                            value={emailGerente}
                            onChange={e => setEmailGerente(e.target.value)}
                        />
                        <input
                            placeholder="Senha"
                            value={senhaGerente}
                            onChange={e => setSenhaGerente(e.target.value)}

                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <br />
                    <Link className="back-link" to="/ConsultarGerentesG">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Gerentes
                    </Link>
                    
                </section>
            </div>
            
                    
        </div>
    );
};
