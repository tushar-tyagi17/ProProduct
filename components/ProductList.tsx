
import React, { useState } from 'react';
import { Product, ViewMode } from '../types';

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, viewMode, onEdit, onDelete }) => {
  // Local state to handle "Double Tap to Delete" instead of browser confirm
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    if (confirmDeleteId === id) {
      onDelete(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      // Auto-reset confirm state after 3 seconds if not tapped again
      setTimeout(() => setConfirmDeleteId(prev => prev === id ? null : prev), 3000);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <i className="fas fa-box-open text-2xl text-slate-400 pointer-events-none"></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-800">No products found</h3>
        <p className="text-slate-500">Try searching for something else.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-bottom border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{product.name}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{product.description || 'No description'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock < 10 ? 'text-orange-500' : 'text-slate-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <i className="fas fa-edit pointer-events-none"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
                        className={`min-w-[40px] h-10 px-2 flex items-center justify-center rounded-xl transition-all border ${
                          confirmDeleteId === product.id 
                            ? 'bg-red-600 border-red-600 text-white animate-pulse' 
                            : 'text-slate-400 border-transparent hover:text-red-600 hover:bg-red-50'
                        }`}
                      >
                        {confirmDeleteId === product.id ? (
                          <span className="text-[10px] font-bold uppercase whitespace-nowrap px-1">Confirm?</span>
                        ) : (
                          <i className="fas fa-trash pointer-events-none"></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition relative group">
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                {product.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg transition"
                >
                  <i className="fas fa-edit text-xs pointer-events-none"></i>
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className={`min-w-[32px] h-8 px-1 flex items-center justify-center rounded-lg transition-all ${
                    confirmDeleteId === product.id 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'text-slate-400 hover:text-red-600 bg-slate-50'
                  }`}
                >
                  {confirmDeleteId === product.id ? (
                    <span className="text-[8px] font-bold uppercase">Sure?</span>
                  ) : (
                    <i className="fas fa-trash text-xs pointer-events-none"></i>
                  )}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{product.name}</h3>
            <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
              {product.description || 'Quality product in ' + product.category}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              <div className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                Stock: <span className={product.stock < 10 ? 'text-orange-500' : 'text-slate-600'}>{product.stock}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
