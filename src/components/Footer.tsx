import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight">ShoeBD</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              বাংলাদেশে মানসম্মত জুতোর জন্য আপনার প্রিমিয়াম গন্তব্য। আমরা দেশব্যাপী ক্যাশ অন ডেলিভারি সহ সেরা ব্র্যান্ডগুলো অফার করি।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">কুইক লিংক</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">হোম</Link></li>
              <li><Link to="/products" className="hover:text-orange-500 transition-colors">সব পণ্য</Link></li>
              <li><Link to="/products?category=ফরমাল" className="hover:text-orange-500 transition-colors">ফরমাল জুতো</Link></li>
              <li><Link to="/products?category=ক্যাজুয়াল" className="hover:text-orange-500 transition-colors">ক্যাজুয়াল জুতো</Link></li>
              <li><Link to="/admin/login" className="hover:text-orange-500 transition-colors">অ্যাডমিন লগইন</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">কাস্টমার সার্ভিস</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">অর্ডার ট্র্যাক করুন</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">রিটার্ন ও এক্সচেঞ্জ</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">শিপিং পলিসি</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ করুন</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>লেভেল ৪, বসুন্ধরা সিটি শপিং কমপ্লেক্স, পান্থপথ, ঢাকা</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+৮৮০ ১৭১১-০০০০০০</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span>support@shoebd.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShoeBD. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-white">পরিষেবার শর্তাবলী</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
