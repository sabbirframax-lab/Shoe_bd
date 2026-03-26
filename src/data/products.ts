export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: number[];
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Apex Sprint Pro Running Shoe",
    description: "Lightweight and breathable running shoe designed for maximum comfort and speed. Perfect for your daily runs around Dhaka.",
    price: 3500,
    originalPrice: 4500,
    image: "https://picsum.photos/seed/shoe1/800/800",
    category: "Running",
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 5,
    featured: true,
  },
  {
    id: "2",
    name: "Bata Classic Leather Loafer",
    description: "Premium leather loafer for formal occasions. Handcrafted for durability and style.",
    price: 4200,
    image: "https://picsum.photos/seed/shoe2/800/800",
    category: "Formal",
    sizes: [40, 41, 42, 43],
    stock: 12,
    featured: true,
  },
  {
    id: "3",
    name: "Lotto Urban Sneaker",
    description: "Trendy urban sneaker for everyday casual wear. Features a comfortable memory foam insole.",
    price: 2800,
    originalPrice: 3200,
    image: "https://picsum.photos/seed/shoe3/800/800",
    category: "Casual",
    sizes: [38, 39, 40, 41, 42],
    stock: 3,
    featured: true,
  },
  {
    id: "4",
    name: "Orion Comfort Walkers",
    description: "Designed for all-day walking comfort. Slip-on design with breathable mesh.",
    price: 1800,
    image: "https://picsum.photos/seed/shoe4/800/800",
    category: "Walking",
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 20,
  },
  {
    id: "5",
    name: "Apex Premium Oxford",
    description: "Classic oxford shoe made from genuine leather. A must-have for the modern gentleman.",
    price: 5500,
    originalPrice: 6000,
    image: "https://picsum.photos/seed/shoe5/800/800",
    category: "Formal",
    sizes: [40, 41, 42, 43, 44],
    stock: 8,
  },
  {
    id: "6",
    name: "Bata Power Sports",
    description: "High-performance sports shoe with excellent grip and shock absorption.",
    price: 3200,
    image: "https://picsum.photos/seed/shoe6/800/800",
    category: "Sports",
    sizes: [39, 40, 41, 42, 43],
    stock: 4,
    featured: true,
  },
  {
    id: "7",
    name: "Lotto Canvas Classic",
    description: "Timeless canvas design that never goes out of style. Available in multiple colors.",
    price: 1500,
    image: "https://picsum.photos/seed/shoe7/800/800",
    category: "Casual",
    sizes: [37, 38, 39, 40, 41, 42],
    stock: 15,
  },
  {
    id: "8",
    name: "Orion Trekking Boots",
    description: "Durable trekking boots for your outdoor adventures. Water-resistant and rugged.",
    price: 4800,
    originalPrice: 5500,
    image: "https://picsum.photos/seed/shoe8/800/800",
    category: "Outdoor",
    sizes: [41, 42, 43, 44, 45],
    stock: 2,
  }
];

export const categories = ["All", "Running", "Formal", "Casual", "Walking", "Sports", "Outdoor"];
