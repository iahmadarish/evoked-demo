import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Links } from './data';

// Define the types for the context values
interface GlobalContextType {
  buttonStates: boolean[];
  setButtonStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  selectedItems: (string | null)[];
  setSelectedItems: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  quantities: number[];
  setQuantities: React.Dispatch<React.SetStateAction<number[]>>;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  selectedButton: number;
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  button: number;
  setButton: React.Dispatch<React.SetStateAction<number>>;
}

// Define the types for the provider props
interface GlobalProviderProps {
  children: ReactNode;
}

// Create the context with the defined types
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [buttonStates, setButtonStates] = useState<boolean[]>(Array(Links.length).fill(false));
  const [selectedItems, setSelectedItems] = useState<(string | null)[]>(Array(Links.length).fill(null));
  const [quantities, setQuantities] = useState<number[]>(Array(Links.length).fill(0));
  const [clicked, setClicked] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<number>(1);
  const [button, setButton] = useState<number>(1);

  return (
    <GlobalContext.Provider value={{ buttonStates, setButtonStates, selectedItems, setSelectedItems, quantities, setQuantities, clicked, setClicked, selectedButton, setSelectedButton, button, setButton }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
