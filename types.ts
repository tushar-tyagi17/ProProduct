
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  createdAt: number;
}

export type ViewMode = 'list' | 'grid';

export interface ProductFormData {
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
}

export interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  stock?: string;
}

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}
