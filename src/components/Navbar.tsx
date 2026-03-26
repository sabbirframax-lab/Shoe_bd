import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">ShoeBD</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">হোম</Link>
            <Link to="/products" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">শপ</Link>
            <Link to="/products?category=ফরমাল" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">ফরমাল</Link>
            <Link to="/products?category=ক্যাজুয়াল" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">ক্যাজুয়াল</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-orange-600 p-2">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="text-gray-500 hover:text-orange-600 p-2 relative" onClick={closeMenu}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-orange-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">হোম</Link>
            <Link to="/products" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">সব পণ্য</Link>
            <Link to="/products?category=ফরমাল" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">ফরমাল জুতো</Link>
            <Link to="/products?category=ক্যাজুয়াল" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50">ক্যাজুয়াল জুতো</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
