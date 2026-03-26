import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Sale
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-md">
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-gray-900 text-white font-bold px-4 py-2 rounded-lg text-sm uppercase tracking-wider">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <Link 
            to={`/product/${product.id}`}
            className="bg-gray-900 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
            aria-label="View Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
