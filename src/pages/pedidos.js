import React, { useState, useEffect } from 'react';
import PageDefault from '../components/PageDefault/PageDefault';
import useForm from '../hooks/useForm';
import * as api from '../api/apiService';
import Tabela from '../components/tableOrders/tableOrders';
import { Container, Form } from 'react-bootstrap';
import Calendario from '../components/Calendario/Calendario';


export default function CadastroPedidos() {

  const valoresIniciais = {
    inteira_meio: "Inteira",
    massa_fina_grossa: "Fina",
    molhoExtra: "Sim",
    sabor: [],
    agenda: '',
    enderecoEntrega: '',
    observacoes: '',
    clientId: ''
  }

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await api.getAllOrders();
      setAllOrders(orders);
    };

    getAllOrders();

  }, []);

  return (
    <Container>
      <PageDefault>
        <h2>Cadastro de Pedidos</h2>
        <Form align="center" onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setAllOrders([
            ...allOrders,
            values
          ]);
          api.submitOrder({ values });
          clearForm()
          console.log(values);
          console.log(allOrders);
        }} >

          {/* Radio Buttons para escolher pizza inteira ou meio-a-meio */}

          <Form.Group controlId="opcoes1">
            <Form.Label>{"Pizza de 1 sabor ou meio-a-meio"}</Form.Label>
            <Form.Control value={values.inteira_meio} as="select" name="inteira_meio" onChange={handleChange}>
              <option value="Inteira">Inteira</option>
              <option value="Meio-a-meio">Meio-a-meio</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="opcoes2">
            <Form.Label>{"Molho extra?"}</Form.Label>
            <Form.Control value={values.molhoExtra} as="select" name="molhoExtra" onChange={handleChange}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="sabores">
            <Form.Label>{"Escolha até 2 sabores para a pizza meio-a-meio"}</Form.Label>
            <Form.Control value={values.sabor} as="select" name="sabor" multiple onChange={handleChange}>
              <option value="Muzzarela">Muzzarela</option>
              <option value="Margerita">Margerita</option>
              <option value="4 Queijos">4 Queijos</option>
              <option value="Berinjela">Berinjela</option>
              <option value="Brigadeiro">Brigadeiro</option>
              <option value="Beijinho">Beijinho</option>
            </Form.Control>
          </Form.Group>

          <Calendario agendamento={values.agenda} />

          <input label="Endereço de Entrega"
            type="text"
            name="enderecoEntrega"
            placeholder="Endereço de Entrega"
            value={values.enderecoEntrega}
            onChange={handleChange} />


          <Form.Group controlId="observacoes">
            <Form.Label>Observações do Pedido</Form.Label>
            <Form.Control as="textarea" rows="3" name="observacoes" value={values.observacoes}
              onChange={handleChange} />
          </Form.Group>

          <input label="CPF"
            type="number"
            name="clientId"
            placeholder="CPF"
            value={values.clientId}
            onChange={handleChange} />

          <input type="submit" value="Cadastrar" />

        </Form>

        <Tabela allOrders={allOrders} className="container" />
      </PageDefault>
    </Container>
  )
}
