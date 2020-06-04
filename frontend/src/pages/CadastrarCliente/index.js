import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

  

export default function CadastrarCliente(){

    const idGerente = localStorage.getItem('cpfGerente');
    const gerenteNome = localStorage.getItem('nomeGerente');

    const [vendedores, setVendedores] = useState([]);



    const [cnpjCliente, setCnpjCliente] = useState('');
    const [nomeFantasiaCliente, setNomeFantasiaCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [cpfVendedor, setIdVendedor] = useState('');

    const history = useHistory();

    useEffect(()=> {
        api.get('vendedor', {
            headers:{
                Authorization: idGerente,
            }
        }).then(response => {
            setVendedores(response.data);
        })
    },[idGerente]);



    async function handleNewCliente(e){
        e.preventDefault();

        const data = {

            cnpjCliente,
            nomeFantasiaCliente,
            telefoneCliente,
            emailCliente,
            enderecoCliente,
            cpfVendedor,
        };
        try {
            await api.post('cliente', data, {
                headers:{
                    Authorization: idGerente,
                }
            });
            alert('Cliente Cadastrado com sucesso.')
            history.push('/ConsultarClientesG')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
        
        
    }
    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className="cad-cliente-container">
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
                    <h1>Cadastrar Cliente:</h1>
                    <form onSubmit={handleNewCliente}>
                        <input 
                            placeholder="CNPJ"
                            value={cnpjCliente}
                            onChange={e => setCnpjCliente(e.target.value)}
                        />
                        <select id="vendedor" onChange={e => setIdVendedor(e.target.value)}>
                            <option disabled selected value=""> Selecionar Vendedor</option>
                            {vendedores.map(vendedor =>(
                                <option 
                                    value= {vendedor.cpfVendedor}
                                >
                                    {vendedor.nomeVendedor}
                                </option>
                            ))}
                            
                        </select>
                        <input 
                            placeholder="Nome Fantasia"
                            value={nomeFantasiaCliente}
                            onChange={e => setNomeFantasiaCliente(e.target.value)}
                        />
                        <input 
                            placeholder="Telefone"
                            value={telefoneCliente}
                            onChange={e => setTelefoneCliente(e.target.value)}    
                        />
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={emailCliente}
                            onChange={e => setEmailCliente(e.target.value)}
                        />
                        <textarea 
                            placeholder="Endereço"
                            value={enderecoCliente}
                            onChange={e => setEnderecoCliente(e.target.value)}

                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <br />
                    <Link className="back-link" to="/ConsultarClientesG">
                        <FiArrowLeft size={16} color="#c87137"/>
                        Voltar para Clientes
                    </Link>
                    
                </section>
            </div>
            
                    
        </div>
    );
};
