import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function LoginGerente(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const history = useHistory();

    async function handleLoginGerente(e){
        e.preventDefault();

        const gerente = {
            email,
            senha,
        };

        
        try{
            const response = await api.post('sessionGerente', gerente);
            localStorage.setItem('cpfGerente', response.data.cpfGerente);
            localStorage.setItem('nomeGerente', response.data.nomeGerente);
            history.push('/TelaGerente');
        } catch(error){
            alert('Falha no login, tente novamente');
        }
        
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" className="logo" />
            
                <form onSubmit={handleLoginGerente}>
                    <h1>Gerente - Realize seu Login</h1>
                    <input 
                        placeholder = "Seu e-mail"
                        type="email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <input 
                        placeholder = "Sua senha" 
                        type="password"
                        value={senha}
                        onChange={e=> setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size="16" color="#c87137"/>
                        Voltar ao início
                    </Link>
                </form>
            </section>
            
        </div>
    );
};
