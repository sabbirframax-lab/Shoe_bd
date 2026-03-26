import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero-shoes/1920/1080?blur=2" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-32 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">
                New Collection 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Step Into <span className="text-orange-600">Style</span> & Comfort
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                Discover the finest collection of footwear for every occasion. Premium quality, unbeatable prices, delivered right to your doorstep anywhere in Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/products" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/products?category=Formal" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center">
                  View Formal Shoes
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <img 
                  src="https://picsum.photos/seed/hero-shoe-main/800/800" 
                  alt="Featured Shoe" 
                  className="relative z-10 w-full rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Nationwide Delivery</h3>
                <p className="text-sm text-gray-500">Fast delivery across Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
                <p className="text-sm text-gray-500">100% authentic products</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                <p className="text-sm text-gray-500">Pay when you receive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Find the perfect pair for your specific needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.filter(c => c !== 'All').slice(0, 4).map((category, index) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] flex items-end p-6"
              >
                <img 
                  src={`https://picsum.photos/seed/cat-${index}/600/800`} 
                  alt={category} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <h3 className="relative z-10 text-white font-bold text-xl md:text-2xl">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collection</h2>
              <p className="text-gray-500">Handpicked favorites just for you.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
