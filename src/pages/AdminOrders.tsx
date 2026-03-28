import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';
import { ShoppingCart, Search, Loader2, CheckCircle, XCircle, Clock, Truck, MoreVertical, ExternalLink, Phone, MapPin, Calendar } from 'lucide-react';

interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  product_name: string;
  product_image: string;
  quantity: number;
  total_price: number;
  confirmation_time: string;
  status: 'Pending' | 'Processing' | 'Confirmed' | 'Cancelled';
  created_at: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: Order['status']) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Processing':
        return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Loader2 className="w-3 h-3 animate-spin" /> Processing</span>;
      case 'Confirmed':
        return <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm) ||
    o.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">অর্ডার ম্যানেজমেন্ট</h1>
          <p className="text-gray-600 mt-1">আপনার স্টোরের সকল অর্ডার এখান থেকে ম্যানেজ করুন</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="নাম, ফোন নম্বর বা প্রোডাক্টের নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 text-gray-500">
              কোনো অর্ডার পাওয়া যায়নি
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                        <h3 className="text-lg font-bold text-gray-900">অর্ডার #{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <Phone className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">কাস্টমারের নাম ও ফোন</p>
                            <p className="font-bold text-gray-900">{order.name}</p>
                            <a href={`tel:${order.phone}`} className="text-sm text-orange-600 hover:underline">{order.phone}</a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <MapPin className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ডেলিভারি ঠিকানা</p>
                            <p className="text-sm text-gray-900 leading-relaxed">{order.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <Calendar className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">অর্ডারের সময়</p>
                            <p className="text-sm text-gray-900">{order.confirmation_time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <ShoppingCart className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">মোট মূল্য</p>
                            <p className="text-lg font-bold text-orange-600">৳{Number(order.total_price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Summary */}
                    <div className="lg:w-80 bg-gray-50 rounded-2xl p-4 flex flex-col justify-between">
                      <div className="flex gap-3">
                        {order.product_image && (
                          <img 
                            src={JSON.parse(order.product_image)[0] || order.product_image} 
                            alt={order.product_name} 
                            className="w-16 h-16 rounded-xl object-cover bg-white" 
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 line-clamp-2">{order.product_name}</p>
                          <p className="text-xs text-gray-500 mt-1">পরিমাণ: {order.quantity} টি</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">স্ট্যাটাস পরিবর্তন করুন</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(['Pending', 'Processing', 'Confirmed', 'Cancelled'] as Order['status'][]).map((status) => (
                            <button
                              key={status}
                              disabled={updatingId === order.id || order.status === status}
                              onClick={() => updateStatus(order.id, status)}
                              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                order.status === status
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600 shadow-sm'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
