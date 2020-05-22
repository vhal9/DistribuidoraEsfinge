import React from 'react';
import {Link} from 'react-router-dom';
import { FiPower, FiEdit, FiSearch, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

import './styles.css';



export default function Login(){
    return(
        <div className="gerente-container">
            <header>
                <img src={logoImg} alt="logo" className="logo" />
                <span>Bem vindo, Victor Hugo</span>

                <Link className="button" to="/">Conta</Link>
                <button type="button"> 
                    <FiPower size={18} color="#c87137"/>
                </button>
            </header>
            <h1>Compras:</h1>
            <section className="table">
                <table>
                    <tr>
                        <th>Fornecedor</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th width="100"></th>
                    </tr>
                    
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr><tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr><tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr><tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr><tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>MT Barbosa</td>
                        <td>20/05/2020</td>
                        <td>R$ 50,00</td>
                        <td>
                            <button><FiSearch size={20} /></button>
                            <button><FiEdit size={20} /></button>
                            <button><FiTrash2 size={20} /></button>
                        </td>
                        
                    </tr>
                    
                    
                    
                    

                </table>
                
            </section>
            <section className="menu">
                <ul>
                    <li>
                        <Link className="button" to="/">Nova Compra</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Produtos</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Fornecedores</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link className="button" to="/">Clientes</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Vendedores</Link>
                    </li>
                    <li>
                        <Link className="button" to="/">Gerentes</Link>
                    </li>
                </ul>
            </section>
                    
        </div>
    );
};
