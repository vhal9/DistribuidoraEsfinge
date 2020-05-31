import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';


export default function LoginVendedor(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const history = useHistory();

    async function handleLoginVendedor(e){
        e.preventDefault();

        const vendedor = {
            email,
            senha,
        };

        try{
            const response = await api.post('sessionVendedor', vendedor);
            localStorage.setItem('cpfVendedor', response.data.cpfVendedor);
            localStorage.setItem('nomeVendedor', response.data.nomeVendedor);
            history.push('/TelaVendedor');
        } catch(error){
            alert('Falha no login, tente novamente');
        }
        
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" className="logo" />
            
                <form onSubmit={handleLoginVendedor}>
                    <h1>Vendedor - Realize seu Login</h1>
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
