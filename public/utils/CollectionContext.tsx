// CollectionContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import type { CollectionFragment } from 'storefrontapi.generated';

interface CollectionContextProps {
  collections: CollectionFragment[];
}

const CollectionContext = createContext<CollectionContextProps | undefined>(undefined);

export const CollectionProvider: React.FC<{ collections: CollectionFragment[], children: ReactNode }> = ({ collections, children }) => {
  return (
    <CollectionContext.Provider value={{ collections }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context.collections;
};
