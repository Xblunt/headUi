import { StoreContext } from '@/stores/StoreProvider';
import { useContext } from 'react';

export const useStores = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return context;
};
