import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Mongoose Schema and Model for Orders
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  quantity: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Route to handle checkout
app.post('/api/orders', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ status: 'error', message: 'Database not connected. Please set MONGODB_URI in environment variables.' });
    }

    const { name, phone, address, productName, productImage, quantity, totalPrice } = req.body;
    
    const newOrder = new Order({
      name,
      phone,
      address,
      productName,
      productImage,
      quantity,
      totalPrice
    });

    await newOrder.save();
    
    res.status(201).json({ status: 'success', message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
});

// Serve the checkout page directly
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'checkout-google-sheets.html'));
});

async function startServer() {
  // Connect to MongoDB
  let MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      // Clean up accidental https:// prefix if copied from a link
      MONGODB_URI = MONGODB_URI.replace(/^https?:\/\//, '');
      
      // Add a default database name (shopDB) if it's missing from the URI
      if (MONGODB_URI.includes('.net/?')) {
        MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/shopDB?');
      } else if (MONGODB_URI.endsWith('.net/')) {
        MONGODB_URI = MONGODB_URI + 'shopDB';
      }

      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  } else {
    console.warn('MONGODB_URI environment variable not set. Orders will not be saved. Please add it to your environment variables.');
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
