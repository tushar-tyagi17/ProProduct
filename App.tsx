
import React, { useState, useMemo, useEffect } from 'react';
import { Product, ViewMode, Toast } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { useDebounce } from './hooks/useDebounce';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [products, debouncedSearch]);

  // Pagination totals
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  
  // Keep page index valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // Improved Delete: Just a simple filter based on the ID
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product removed from list.`, 'info');
  };

  const handleFormSubmit = (data: Partial<Product>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...data } : p
      ));
      showToast(`Product updated.`);
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name!,
        price: data.price!,
        category: data.category!,
        stock: data.stock!,
        description: data.description,
        createdAt: Date.now()
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast(`Added successfully.`);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative min-h-screen">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-300 pointer-events-none">
          <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-white font-bold ${
            toast.type === 'info' ? 'bg-slate-800' : 'bg-green-600'
          }`}>
            <i className={`fas ${toast.type === 'info' ? 'fa-info-circle' : 'fa-check-circle'} pointer-events-none`}></i>
            {toast.message}
          </div>
        </div>
      )}

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">ProProduct</h1>
          <p className="text-slate-500 mt-1">Inventory Management Dashboard</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64 transition shadow-sm"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus pointer-events-none"></i>
            Add Product
          </button>
        </div>
      </header>

      <div className="mb-6 flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition flex items-center gap-2 ${
              viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-list pointer-events-none"></i>
            List
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition flex items-center gap-2 ${
              viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-th-large pointer-events-none"></i>
            Grid
          </button>
        </div>
        <div className="text-sm text-slate-500 pr-4 hidden sm:block">
          Total Items: <b>{filteredProducts.length}</b>
        </div>
      </div>

      <main>
        <ProductList
          products={currentProducts}
          viewMode={viewMode}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          totalItems={filteredProducts.length}
        />
      </main>

      {isFormOpen && (
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
