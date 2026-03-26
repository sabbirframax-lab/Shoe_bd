import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, ShieldCheck, Truck, AlertCircle } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/products" className="text-orange-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setError('');
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  Sale
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl overflow-hidden aspect-square cursor-pointer border-2 border-transparent hover:border-orange-500 transition-colors">
                  <img 
                    src={`${product.image}?var=${i}`} 
                    alt={`${product.name} view ${i}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-6">
              <div className="text-sm text-orange-600 font-bold uppercase tracking-wider mb-2">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through mb-1">৳{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mb-8 border-t border-b border-gray-100 py-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Size (EU)</h3>
                <button className="text-sm text-gray-500 underline hover:text-gray-900">Size Guide</button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setError('');
                    }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white shadow-md scale-110'
                        : 'bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {error}
                </p>
              )}
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quantity</h3>
              <div className="flex items-center">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {product.stock > 0 ? (
                    <span className={product.stock <= 5 ? "text-orange-600 font-semibold" : ""}>
                      {product.stock} items available
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Out of stock</span>
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 sm:relative sm:p-0 sm:border-0 sm:bg-transparent z-40">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  isAdded 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAdded ? (
                  <><Check className="w-5 h-5" /> Added to Cart</>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg text-white transition-all shadow-lg ${
                  product.stock === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700 hover:shadow-orange-500/30'
                }`}
              >
                Buy Now
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 pt-8 border-t border-gray-100 pb-24 sm:pb-0">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-gray-400" />
                <span>Free delivery inside Dhaka</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>7 days return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
