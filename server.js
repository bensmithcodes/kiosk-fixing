const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const data = require('./data');
const socket = require('socket.io'); // Import the socket.io library

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://bencoder28:sabers13@kiosk.qqa7es6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
  })
);

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      totalPrice: Number,
      taxPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.get('/api/categories', (req, res) => res.send(data.categories));

app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app.get('/api/products/seed', async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

app.post('/api/orders', async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});

app.put('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === 'ready') {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === 'deliver') {
      order.isDelivered = true;
    } else if (req.body.action === 'cancel') {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: 'Done' });
  } else {
    res.status(404).send('Order not found');
  }
});

app.get('/api/orders/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    'number'
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number'
  );
  res.send({ inProgressOrders, servingOrders });
});

app.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Assume that 'orderCompleted' event is emitted when an order is completed
  socket.on('orderCompleted', (orderNumber) => {
    // Handle order completion logic

    // Emit 'queueUpdate' event to notify clients about queue update
    io.emit('queueUpdate');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
