/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json');
const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/products', (req, res) => {
  fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/product', (req, res) => {
  fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
    const products = JSON.parse(data);
		//console.log('product', product);
    const newProduct = { id: parseInt(req.body.id, 10), nombre: req.body.nombre, descripcion: req.body.descripcion, precio: parseFloat(req.body.precio), tickeado: false };
    let productExists = false;
    products.map((product) => {
      if (product.id === newProduct.id) {
        //cartProduct.cantidad++;
        productExists = true;
      }
    });
    if (!productExists) products.push(newProduct);
    fs.writeFile(PRODUCT_DATA_FILE, JSON.stringify(products, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(products);
    });
  });
});

app.get('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    const newCartProduct = { id: req.body.id, nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidad: 1 };
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.cantidad++;
        cartProductExists = true;
      }
    });
    if (!cartProductExists) cartProducts.push(newCartProduct);
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});

app.post('/cart/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === req.body.id && cartProduct.cantidad > 1) {
        cartProduct.cantidad--;
      } else if (cartProduct.id === req.body.id && cartProduct.cantidad === 1) {
        const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});

app.post('/cart/delete/all', (req, res) => {
  fs.readFile(CART_DATA_FILE, () => {
    let emptyCart = [];
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
      res.json(emptyCart);
    });
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
