import { create } from 'zustand';
import type { PageView, Product } from '@/types';

interface NavigationStore {
  currentPage: PageView;
  previousPage: PageView;
  selectedProduct: Product | null;
  prefillProduct: string | null;
  isMobileMenuOpen: boolean;
  navigate: (page: PageView) => void;
  setSelectedProduct: (product: Product | null) => void;
  setPrefillProduct: (productName: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>()((set) => ({
  currentPage: 'home',
  previousPage: 'home',
  selectedProduct: null,
  prefillProduct: null,
  isMobileMenuOpen: false,
  navigate: (page) => {
    set((state) => ({ previousPage: state.currentPage, currentPage: page, isMobileMenuOpen: false }));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setPrefillProduct: (productName) => set({ prefillProduct: productName }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
