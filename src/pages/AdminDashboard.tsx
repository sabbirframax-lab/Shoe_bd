import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';
import { Package, ShoppingCart, TrendingUp, Users, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    confirmedOrders: 0,
    cancelledOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Orders
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*');

        if (ordersError) throw ordersError;

        // Fetch Products
        const { count: productCount, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        if (productsError) throw productsError;

        const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_price), 0) || 0;
        const pending = orders?.filter(o => o.status === 'Pending').length || 0;
        const processing = orders?.filter(o => o.status === 'Processing').length || 0;
        const confirmed = orders?.filter(o => o.status === 'Confirmed').length || 0;
        const cancelled = orders?.filter(o => o.status === 'Cancelled').length || 0;

        setStats({
          totalOrders: orders?.length || 0,
          totalProducts: productCount || 0,
          totalRevenue,
          pendingOrders: pending,
          processingOrders: processing,
          confirmedOrders: confirmed,
          cancelledOrders: cancelled,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'মোট অর্ডার', value: stats.totalOrders, icon: ShoppingCart, color: 'bg-blue-500' },
    { name: 'মোট প্রোডাক্ট', value: stats.totalProducts, icon: Package, color: 'bg-purple-500' },
    { name: 'মোট রেভিনিউ', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-green-500' },
    { name: 'পেন্ডিং অর্ডার', value: stats.pendingOrders, icon: Clock, color: 'bg-yellow-500' },
  ];

  const statusCards = [
    { name: 'Pending', value: stats.pendingOrders, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Processing', value: stats.processingOrders, icon: Loader2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Confirmed', value: stats.confirmedOrders, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Cancelled', value: stats.cancelledOrders, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড ওভারভিউ</h1>
          <p className="text-gray-600 mt-1">আপনার ব্যবসার বর্তমান অবস্থা একনজরে দেখুন</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
              <div className={`${stat.color} p-4 rounded-xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">অর্ডার স্ট্যাটাস ব্রেকডাউন</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statusCards.map((status) => (
              <div key={status.name} className={`${status.bg} rounded-xl p-6 text-center transition-all hover:scale-105`}>
                <status.icon className={`w-8 h-8 mx-auto mb-3 ${status.color}`} />
                <p className="text-2xl font-bold text-gray-900">{status.value}</p>
                <p className={`text-sm font-medium ${status.color}`}>{status.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">সাম্প্রতিক অর্ডারসমূহ</h2>
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>অর্ডার ম্যানেজমেন্ট সেকশনে বিস্তারিত দেখুন</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">সাম্প্রতিক প্রোডাক্টসমূহ</h2>
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>প্রোডাক্ট ম্যানেজমেন্ট সেকশনে বিস্তারিত দেখুন</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
