import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarProduto(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');


    const [nomeProduto, setNomeProduto] = useState('');
    const [marcaProduto, setMarcaProduto] = useState('');
    const [estoqueProduto, setEstoqueProduto] = useState('');
    const [precoAtualProduto, setPrecoAtualProduto] = useState('');

    const history = useHistory();

    async function handleNewProduto(e){
        e.preventDefault();

        const data = {

            nomeProduto,
            marcaProduto,
            estoqueProduto,
            precoAtualProduto,
        };
        try {
            await api.post('produto', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Produto Cadastrado com sucesso.')
            history.push('/ConsultarProdutosG')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }


    return(
        <div className="cad-produto-container">
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
                    <h1>Cadastrar produto:</h1>
                    <form onSubmit={handleNewProduto}>
                        
                        
                        <input 
                            placeholder="Nome"
                            value={nomeProduto}
                            onChange={e => setNomeProduto(e.target.value)}
                        />
                        <input 
                            placeholder="Marca"
                            value={marcaProduto}
                            onChange={e => setMarcaProduto(e.target.value)}    
                        />
                        <input 
                            type="number"
                            min="0"
                            placeholder="Estoque"
                            value={estoqueProduto}
                            onChange={e => setEstoqueProduto(e.target.value)}
                        />
                        <input
                            placeholder="Preco"
                            type="number"
                            step="0.01"
                            min="0"
                            value={precoAtualProduto}
                            onChange={e => setPrecoAtualProduto(e.target.value)}

                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <br />
                    <Link className="back-link" to="/ConsultarProdutosG">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Produtos
                    </Link>
                    
                </section>
            </div>
            
                    
        </div>
    );
};
