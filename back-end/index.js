var express = require('express');
var app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors(
  //origin
  'http://localhost:3000'
))


//Ver todos os clientes
app.get('/clients', (_, res) => {
  fs.readFile('clients.json', 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

//Cadastrar cliente
app.post('/cadastrarcli', (req, res) => {
  let client = req.body;
  fs.readFile('clients.json', 'utf-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        client = { id: json.cpf, ...client };
        json.clients.push(client);

        fs.writeFile('clients.json', JSON.stringify(json), err => {
          if (err) {
            console.log(err);
          } else {
            res.send('Cliente cadastrado!');
          }
        });
      } catch (err) {
        res.status(400).send(err.message);
      }
    } else {
      res.status(400).send(err.message);
    }
  })
});

//Ver todos os pedidos
app.get('/orders', (_, res) => {
  fs.readFile('orders.json', 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err.message);
    }
  });
});

// Registrar pedidos
app.post('/cadastrarped', (req, res) => {
  let order = req.body;
  fs.readFile('orders.json', 'utf-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        order = { id: json.nextOrderId++, ...order };
        json.orders.push(order);

        fs.writeFile('orders.json', JSON.stringify(json), err => {
          if (err) {
            console.log(err);
          } else {
            // fs.appendFileSync('clients.json', JSON.stringify(order), _ => {
            //   order = { ...order };
            //   orders.push(order);
            // });
            res.send('Pedido registrado!');
          }
        });
      } catch (err) {
        res.status(400).send('Erro ao registrar pedido');
      }
    } else {
      res.status(400).send('Erro na leitura');
    }
  })
});


app.listen(3001, function () {
  console.log("API started");
  // Verifica se há registro de clientes. Se não houver, um será
  // criado a partir do primeiro cadastro.
  try {
    fs.readFile('clients.json', "utf-8", (err, data) => {
      if (err) {
        const initialJson = {
          clients: [],
        };
        fs.writeFile('clients.json', JSON.stringify(initialJson), err => {
          console.log(err);
        })
      }
    })
  } catch (err) {
    console.log(err);
  };

  // Verifica se há registro de pedidos. Se não houver, um será
  // criado a partir do primeiro cadastro.
  try {
    fs.readFile('orders.json', "utf-8", (err, data) => {
      if (err) {
        const initialJson1 = {
          nextOrderId: 1,
          orders: [],
        };
        fs.writeFile('orders.json', JSON.stringify(initialJson1), err => {
          console.log(err);
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})