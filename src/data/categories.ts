import { Category } from '../types/blog';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech trends, software reviews, and digital innovations',
    color: 'bg-blue-500',
    icon: 'Laptop'
  },
  {
    id: '2',
    name: 'Health',
    slug: 'health',
    description: 'Wellness tips, fitness guides, and healthy living advice',
    color: 'bg-green-500',
    icon: 'Heart'
  },
  {
    id: '3',
    name: 'Travel',
    slug: 'travel',
    description: 'Travel guides, destination reviews, and adventure stories',
    color: 'bg-purple-500',
    icon: 'Plane'
  },
  {
    id: '4',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Home decor, fashion, productivity, and personal development',
    color: 'bg-pink-500',
    icon: 'Coffee'
  },
  {
    id: '5',
    name: 'Finance',
    slug: 'finance',
    description: 'Personal finance, investing tips, and money management',
    color: 'bg-yellow-500',
    icon: 'DollarSign'
  }
];