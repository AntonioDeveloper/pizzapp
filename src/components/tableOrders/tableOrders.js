import React from 'react';
import { Table } from 'react-bootstrap';


export default function TabelaPedidos({ allOrders }) {

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>inteira-MeioMeio</th>
          <th>massaFina-Grossa</th>
          <th>molhoExtra</th>
          <th>sabor</th>
          <th>observacoes</th>
          <th>cpf</th>
        </tr>
      </thead>
      <tbody>
        {allOrders.map((order, index) => {
          return (
            <tr key={order.id}>
              <th scope="row">{order.id}</th>
              <td>{order.inteira_meio}</td>
              <td>{order.massa_fina_grossa}</td>
              <td>{order.molhoExtra}</td>
              <td>{order.sabor}</td>
              <td>{order.observacoes}</td>
              <td>{order.cpf}</td>
            </tr>
          );
        })
        }
      </tbody>
    </Table>
  )
}
