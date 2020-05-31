import React from 'react';
import {Link} from 'react-router-dom'
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Inicial(){
    return(
        <div className="inicial-container">
            <section className="form">
                <img src={logoImg} alt="logo" className="logo" />
            
                <form >
                    <h1>Seja bem vindo ao sistema da Distribuidora Esfinge</h1>
                    <Link className="button-menu" to="/LoginGerente">
                        <button className="button" type="submit">Gerente</button>
                    </Link>
                    <Link className="button-menu" to="/LoginVendedor">
                        <button className="button" type="submit">Vendedor</button>
                    </Link>
                </form>
            </section>
            
        </div>
    );
};
