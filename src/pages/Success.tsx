import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">অর্ডার নিশ্চিত করা হয়েছে!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
        আপনার ক্রয়ের জন্য ধন্যবাদ। আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে এবং শীঘ্রই ক্যাশ অন ডেলিভারির মাধ্যমে পৌঁছে দেওয়া হবে।
      </p>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-full max-w-md text-center">
        <p className="text-sm text-gray-500 mb-2">অর্ডার রেফারেন্স নম্বর</p>
        <p className="text-xl font-mono font-bold text-gray-900">
          #SBD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
        </p>
      </div>
      
      <Link 
        to="/products" 
        className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-orange-500/30"
      >
        শপিং চালিয়ে যান
      </Link>
    </div>
  );
};

export default Success;
