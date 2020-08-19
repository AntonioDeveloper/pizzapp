import React, { useState, useEffect } from 'react';
import PageDefault from '../components/PageDefault/PageDefault';
import useForm from '../hooks/useForm';
import * as api from '../api/apiService';
import Tabela from '../components/tableOrders/tableOrders';
import { Container, Form } from 'react-bootstrap';
//import Calendario from '../components/Calendario/index';

export default function CadastroPedidos() {

  const valoresIniciais = {
    checked: false,
    inteira_meio: '',
    massa_fina_grossa: '',
    molhoExtra: '',
    sabor: '',
    agenda: '',
    enderecoEntrega: '',
    observacoes: '',
    clientId: ''
  }

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [allOrders, setAllOrders] = useState([]);

  let [checked, setChecked] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await api.getAllOrders();
      setAllOrders(orders);
    };

    getAllOrders();

  }, []);

  const onRadioChange = (e) => {
    checked = true;
    setChecked(checked);
  }

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
          api.getAllOrders({ values });
          clearForm()
          console.log(allOrders);
        }} >

          {/* Radio Buttons para escolher pizza inteira ou meio-a-meio */}

          {['radio'].map((type) => (
            <div key={type} className="mb-3">
              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="inteira_meio" isValid />
                <Form.Check.Label>{"Inteira"}</Form.Check.Label>
              </Form.Check>

              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="inteira_meio" isValid />
                <Form.Check.Label>{"Meio-a-meio"}</Form.Check.Label>
              </Form.Check>
              <br />

              {/* Radio Buttons para escolher espessura da massa */}

              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="espessura" isValid />
                <Form.Check.Label>{"Massa fina"}</Form.Check.Label>
              </Form.Check>

              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="espessura" isValid />
                <Form.Check.Label>{"Massa grossa"}</Form.Check.Label>
              </Form.Check>

              <br />

              {/* Radio Buttons para decidir se quer molho extra */}
              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="molho" isValid />
                <Form.Check.Label>{"Sim"}</Form.Check.Label>
              </Form.Check>

              <Form.Check type={type} id={`check-api-${type}`}>
                <Form.Check.Input type={type} checked={checked}
                  onChange={onRadioChange} name="molho" isValid />
                <Form.Check.Label>{"Não"}</Form.Check.Label>
              </Form.Check>
            </div>
          ))}

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>{"Escolha até 2 sabores para a pizza meio-a-meio"}</Form.Label>
            <Form.Control as="select" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          {/* <Calendario /> */}

          <input label="CPF"
            type="number"
            name="id"
            placeholder="CPF"
            value={values.clientId}
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

        </Form>

        <Tabela allOrders={allOrders} className="container" />
      </PageDefault>
    </Container>
  )
}
