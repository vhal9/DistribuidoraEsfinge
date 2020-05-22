import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.png';


export default function LoginVendedor(){
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" className="logo" />
            
                <form>
                    <h1>Vendedor - Realize seu Login</h1>
                    <input placeholder = "Seu e-mail"/>
                    <input placeholder = "Sua senha" type="password"/>
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
