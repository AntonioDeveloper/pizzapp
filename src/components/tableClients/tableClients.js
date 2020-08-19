import React from 'react';
import { Table } from 'react-bootstrap';


export default function Tabela({ allClients }) {

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>CPF</th>
          <th>Nome Completo</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Endereço</th>
          <th>Endereço de Entrega</th>
        </tr>
      </thead>
      <tbody>
        {allClients.map((client, index) => {
          return (
            <tr key={index}>
              <th scope="row">{client.id}</th>
              <td>{client.nomeCliente}</td>
              <td>{client.telefone}</td>
              <td>{client.email}</td>
              <td>{client.endereco}</td>
              <td>{client.enderecoEntrega}</td>
            </tr>
          );
        })
        }
      </tbody>
    </Table>
  )
}
