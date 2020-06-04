import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarVenda(){

    const cpfVendedor = localStorage.getItem('cpfVendedor');
    const idVendedor = localStorage.getItem('cpfVendedor');
    const vendedorNome = localStorage.getItem('nomeVendedor');

    const [clientes, setClientes] = useState([]);



    const [dataVenda, setDataVenda] = useState('');
    const [totalVenda, setTotalVenda] = useState('');
    const [idCliente, setIdCliente] = useState('');

    const history = useHistory();

    useEffect(()=> {
        api.get('clienteVendedor', {
            headers:{
                Authorization: cpfVendedor,
            }
        }).then(response => {
            setClientes(response.data);
        })
    },[cpfVendedor]);



    async function handleNewVenda(e){
        e.preventDefault();

        const data = {

            idCliente,
            idVendedor,
            dataVenda,
            totalVenda,
        };
        try {
            await api.post('venda', data, {
                headers:{
                    Authorization: cpfVendedor,
                }
            });
            alert('Venda cadastrada com sucesso.')
            history.push('/Vendedor')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
        
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className="cad-venda-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, {vendedorNome}</span>

                <Link className="button" to="/ConsultarGerente">Conta</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <div className="body" >
                
                <section className="form">
                    <h1>Cadastrar Venda:</h1>
                    <form onSubmit={handleNewVenda}>
                        
                        <select id="cliente" onChange={e => setIdCliente(e.target.value)}>
                            <option disabled selected value=""> Selecionar Cliente</option>
                            {clientes.map(cliente =>(
                                <option 
                                    value= {cliente.cnpjCliente}
                                >
                                    {cliente.nomeFantasiaCliente}
                                </option>
                            ))}
                            
                        </select>
                        
                        
                        <input 
                            placeholder="Total"
                            type="number"
                            step="0.01"
                            min="0"
                            
                            value={totalVenda}
                            onChange={e => setTotalVenda(e.target.value)}
                        />
                        
                        <input 
                            placeholder="Data"
                            type="date"
                            min="01-01-2020"
                            max="31-12-2021"
                            value={dataVenda}
                            onChange={e => setDataVenda(e.target.value)}
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
