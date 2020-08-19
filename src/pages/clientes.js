import React, { useState, useEffect } from 'react';
import PageDefault from '../components/PageDefault/PageDefault';
import useForm from '../hooks/useForm';
import * as api from '../api/apiService';
import Tabela from '../components/tableClients/tableClients';
import { Container } from 'react-bootstrap';


export default function CadastroClientes() {

  const valoresIniciais = {
    nomeCliente: '',
    id: '',
    telefone: '',
    email: '',
    endereco: '',
    enderecoEntrega: ''
  }

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const clients = await api.getAllClients();
      setAllClients(clients);
    };

    getClients();

  }, []);

  return (
    <Container>
      <PageDefault>
        <h2>Cadastro de Clientes</h2>
        <form align="center" onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setAllClients([
            ...allClients,
            values
          ]);
          api.submitClient({ values });
          clearForm()
          console.log(allClients);
        }} >

          <input label="Nome do Cliente"
            type="text"
            name="nomeCliente"
            placeholder="Nome do Cliente"
            value={values.nome}
            onChange={handleChange} />

          <input label="CPF"
            type="number"
            name="id"
            placeholder="CPF"
            value={values.id}
            onChange={handleChange} />

          <input label="Telefone"
            type="number"
            name="telefone"
            placeholder="Telefone"
            value={values.telefone}
            onChange={handleChange} />

          <input label="E-mail"
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handleChange} />

          <input label="Endereço"
            type="text"
            name="endereco"
            placeholder="Endereço residencial"
            value={values.endereco}
            onChange={handleChange} />

          <input label="Endereço de Entrega"
            type="text"
            name="enderecoEntrega"
            placeholder="Endereço de Entrega"
            value={values.enderecoEntrega}
            onChange={handleChange} />

          <input type="submit" value="Cadastrar" />

        </form>

        <Tabela allClients={allClients} className="container" />
      </PageDefault>
    </Container>
  )
}
