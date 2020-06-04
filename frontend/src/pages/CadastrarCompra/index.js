import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarCompra(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [fornecedores, setFornecedores] = useState([]);



    const [dataCompra, setDataCompra] = useState('');
    const [totalCompra, setTotalCompra] = useState('');
    const [idFornecedor, setIdFornecedor] = useState('');

    const history = useHistory();

    useEffect(()=> {
        api.get('fornecedor', {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setFornecedores(response.data);
        })
    },[idGerente]);



    async function handleNewCompra(e){
        e.preventDefault();

        const data = {

            idFornecedor,
            idGerente,
            dataCompra,
            totalCompra,
        };
        try {
            await api.post('compra', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Compra cadastrada com sucesso.')
            history.push('/CadastrarCompra')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }



    return(
        <div className="cad-compra-container">
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
                    <h1>Cadastrar Compra:</h1>
                    <form onSubmit={handleNewCompra}>
                        
                        <select id="fornecedor" onChange={e => setIdFornecedor(e.target.value)}>
                            <option disabled selected value=""> Selecionar Fornecedor</option>
                            {fornecedores.map(fornecedor =>(
                                <option 
                                    value= {fornecedor.cnpjFornecedor}
                                >
                                    {fornecedor.nomeFornecedor}
                                </option>
                            ))}
                            
                        </select>
                        
                        
                        <input 
                            placeholder="Total"
                            type="number"
                            step="0.01"
                            min="0"
                            
                            value={totalCompra}
                            onChange={e => setTotalCompra(e.target.value)}
                        />
                        
                        <input 
                            placeholder="Data"
                            type="date"
                            min="01-01-2020"
                            max="31-12-2021"
                            value={dataCompra}
                            onChange={e => setDataCompra(e.target.value)}
                        />
                        
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
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
