import React from 'react';
import {Link} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

import './styles.css';



export default function Login(){
    return(
        <div className="cliente-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, Victor Hugo</span>

                <Link className="button" to="/">Conta</Link>
                <button type="button"> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                
                <section className="form">
                    <h1>Cadastrar Produto:</h1>
                    <form>
                        <input placeholder="CNPJ" />
                        <input placeholder="Nome Fantasia" />
                        <input placeholder="Telefone" />
                        <input placeholder="Email" />
                        <textarea 
                            placeholder="Endereço"
                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <Link className="back-link" to="/gerente">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Início
                    </Link>
                    
                </section>
            </div>
            
                    
        </div>
    );
};
