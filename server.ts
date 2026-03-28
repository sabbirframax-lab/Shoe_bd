import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Supabase client
const supabaseUrl = 'https://hompqifankcwzxlefodj.supabase.co';
const supabaseKey = 'sb_publishable_K5-fPCekB_SwMYp15cI8og_eOggNJJR';
const supabase = createClient(supabaseUrl, supabaseKey);

// API Route to handle checkout
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, productName, productImage, quantity, totalPrice } = req.body;
    
    // Get current time in Bangladesh timezone
    const confirmation_time = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
    
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          name,
          phone,
          address,
          product_name: productName,
          product_image: productImage,
          quantity,
          total_price: totalPrice,
          confirmation_time,
          status: 'Pending'
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ status: 'error', message: error.message });
    }
    
    res.status(201).json({ status: 'success', message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
});

async function startServer() {
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
