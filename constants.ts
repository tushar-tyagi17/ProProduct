
import { Product } from './types';

export const CATEGORIES = [
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Beauty',
  'Books',
  'Sports',
  'Toys'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999.99,
    category: 'Electronics',
    stock: 25,
    description: 'The latest flagship iPhone with titanium design and A17 Pro chip.',
    createdAt: Date.now() - 1000000
  },
  {
    id: '2',
    name: 'Ergonomic Desk Chair',
    price: 249.50,
    category: 'Home & Kitchen',
    stock: 12,
    description: 'High-back mesh office chair with lumbar support and 4D armrests.',
    createdAt: Date.now() - 2000000
  },
  {
    id: '3',
    name: 'Leather Weekend Bag',
    price: 185.00,
    category: 'Fashion',
    stock: 8,
    description: 'Handcrafted full-grain leather duffel bag for stylish travel.',
    createdAt: Date.now() - 3000000
  },
  {
    id: '4',
    name: 'Pro Noise Cancelling Headphones',
    price: 349.00,
    category: 'Electronics',
    stock: 40,
    description: 'Industry-leading noise cancellation with superior sound quality.',
    createdAt: Date.now() - 4000000
  },
  {
    id: '5',
    name: 'Cast Iron Skillet',
    price: 45.99,
    category: 'Home & Kitchen',
    stock: 15,
    description: 'Pre-seasoned 12-inch cast iron skillet for professional cooking.',
    createdAt: Date.now() - 5000000
  },
  {
    id: '6',
    name: 'Smart Watch Series 9',
    price: 399.00,
    category: 'Electronics',
    stock: 30,
    description: 'Powerful health monitoring and fitness tracking on your wrist.',
    createdAt: Date.now() - 6000000
  },
  {
    id: '7',
    name: 'Minimalist Wallet',
    price: 29.99,
    category: 'Fashion',
    stock: 100,
    description: 'RFID blocking slim aluminum wallet for front pocket carry.',
    createdAt: Date.now() - 7000000
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    price: 65.00,
    category: 'Sports',
    stock: 20,
    description: 'Extra thick non-slip yoga mat for all types of practice.',
    createdAt: Date.now() - 8000000
  }
];
