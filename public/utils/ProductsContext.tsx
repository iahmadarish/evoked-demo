
import React, { createContext, useContext, ReactNode, useState } from 'react';
import type { ProductFragment } from 'storefrontapi.generated';

interface ProductContextType {
  product: ProductFragment | null;
  setProduct: (product: ProductFragment) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<ProductFragment | null>(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
