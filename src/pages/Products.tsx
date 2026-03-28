import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'সব';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setAllProducts(data);
        } else {
          // Fallback to hardcoded products if table is empty
          const { products: hardcodedProducts } = await import('../data/products');
          setAllProducts(hardcodedProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to hardcoded products on error
        const { products: hardcodedProducts } = await import('../data/products');
        setAllProducts(hardcodedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'সব') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, allProducts]);

  useEffect(() => {
    const categoryFromUrl = queryParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [location.search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">আমাদের কালেকশন</h1>
            <p className="text-gray-500">দেখাচ্ছে {filteredProducts.length} টি ফলাফল</p>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium w-full justify-center"
            >
              <Filter className="w-4 h-4" /> ক্যাটাগরি ফিল্টার করুন
            </button>
          </div>

          <div className={`flex-col md:flex-row gap-2 md:flex ${isFilterOpen ? 'flex' : 'hidden'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-gray-500">অন্য একটি ক্যাটাগরি নির্বাচন করার চেষ্টা করুন।</p>
            <button 
              onClick={() => setActiveCategory('সব')}
              className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
