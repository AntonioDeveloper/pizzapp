import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import Tabela from './components/tableClients/tableClients';
import TabelaPedidos from './components/tableOrders/tableOrders';
import { Container } from 'react-bootstrap';
import PageDefault from './components/PageDefault/PageDefault';

export default function App() {

  const [allClients, setAllClients] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const clients = await api.getAllClients();
      setAllClients(clients);
    };

    const getOrders = async () => {
      const orders = await api.getAllOrders();
      setAllOrders(orders);
    };

    getClients();
    getOrders();
  }, []);

  for (let i = 0; i <= allClients.length; i++) {
    console.log(allClients[i]);
  }

  console.log(allOrders)

  return (
    <Container>
      <PageDefault>
        <Tabela allClients={allClients} className="container" />
        <TabelaPedidos allOrders={allOrders} className="container" />
      </PageDefault>
    </Container>

  )
};

