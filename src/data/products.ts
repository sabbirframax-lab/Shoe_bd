export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  sizes: number[];
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "এপেক্স স্প্রিন্ট প্রো রানিং শু",
    description: "সর্বোচ্চ আরাম এবং গতির জন্য ডিজাইন করা হালকা ওজনের রানিং শু। আপনার প্রতিদিনের দৌড়ানোর জন্য একদম পারফেক্ট।",
    price: 3500,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1605340537586-0a5a282b57b6?w=800&q=80",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80"
    ],
    category: "রানিং",
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 5,
    featured: true,
  },
  {
    id: "2",
    name: "বাটা ক্লাসিক লেদার লোফার",
    description: "ফরমাল অনুষ্ঠানের জন্য প্রিমিয়াম লেদার লোফার। টেকসই এবং স্টাইলিশ ডিজাইনে হাতে তৈরি।",
    price: 4200,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
    ],
    category: "ফরমাল",
    sizes: [40, 41, 42, 43],
    stock: 12,
    featured: true,
  },
  {
    id: "3",
    name: "লোটো আরবান স্নিকার",
    description: "প্রতিদিনের ক্যাজুয়াল ব্যবহারের জন্য ট্রেন্ডি আরবান স্নিকার। আরামদায়ক মেমরি ফোম ইনসোল যুক্ত।",
    price: 2800,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
    ],
    category: "ক্যাজুয়াল",
    sizes: [38, 39, 40, 41, 42],
    stock: 3,
    featured: true,
  },
  {
    id: "4",
    name: "ওরিয়ন কমফোর্ট ওয়াকার্স",
    description: "সারাদিন হাঁটার আরামের জন্য ডিজাইন করা। শ্বাসপ্রশ্বাসযোগ্য মেশ সহ স্লিপ-অন ডিজাইন।",
    price: 1800,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    category: "ওয়াকিং",
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 20,
  },
  {
    id: "5",
    name: "এপেক্স প্রিমিয়াম অক্সফোর্ড",
    description: "আসল চামড়া দিয়ে তৈরি ক্লাসিক অক্সফোর্ড জুতো। আধুনিক ভদ্রলোকদের জন্য একটি আবশ্যক জুতো।",
    price: 5500,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
    ],
    category: "ফরমাল",
    sizes: [40, 41, 42, 43, 44],
    stock: 8,
  },
  {
    id: "6",
    name: "বাটা পাওয়ার স্পোর্টস",
    description: "চমৎকার গ্রিপ এবং শক অ্যাবজরপশন সহ উচ্চ-পারফরম্যান্স স্পোর্টস শু।",
    price: 3200,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1605340537586-0a5a282b57b6?w=800&q=80"
    ],
    category: "স্পোর্টস",
    sizes: [39, 40, 41, 42, 43],
    stock: 4,
    featured: true,
  },
  {
    id: "7",
    name: "লোটো ক্যানভাস ক্লাসিক",
    description: "কালজয়ী ক্যানভাস ডিজাইন যা কখনই পুরনো হয়বিধা হয় না। একাধিক রঙে উপলব্ধ।",
    price: 1500,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
    ],
    category: "ক্যাজুয়াল",
    sizes: [37, 38, 39, 40, 41, 42],
    stock: 15,
  },
  {
    id: "8",
    name: "ওরিয়ন ট্রেকিং বুটস",
    description: "আপনার আউটডোর অ্যাডভেঞ্চারের জন্য টেকসই ট্রেকিং বুট। জল-প্রতিরোধী এবং রুক্ষ।",
    price: 4800,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    category: "আউটডোর",
    sizes: [41, 42, 43, 44, 45],
    stock: 2,
  }
];

export const categories = ["সব", "রানিং", "ফরমাল", "ক্যাজুয়াল", "ওয়াকিং", "স্পোর্টস", "আউটডোর"];
