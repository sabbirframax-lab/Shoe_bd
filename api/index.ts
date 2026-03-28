import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();

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

// For local development if needed, but Vercel will use the exported app
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
  });
}

export default app;
