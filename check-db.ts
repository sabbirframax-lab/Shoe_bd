import mongoose from 'mongoose';

async function checkDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('No URI');
    return;
  }
  
  let MONGODB_URI = uri.replace(/^https?:\/\//, '');
  if (MONGODB_URI.includes('.net/?')) {
    MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/shopDB?');
  } else if (MONGODB_URI.endsWith('.net/')) {
    MONGODB_URI = MONGODB_URI + 'shopDB';
  }

  await mongoose.connect(MONGODB_URI);
  
  const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    productName: String,
    productImage: String,
    quantity: Number,
    totalPrice: String,
    createdAt: Date
  });
  const Order = mongoose.model('Order', orderSchema);
  
  const count = await Order.countDocuments();
  console.log('Total orders in DB:', count);
  
  const orders = await Order.find().limit(2);
  console.log('Sample orders:', orders);
  
  await mongoose.disconnect();
}

checkDb().catch(console.error);
