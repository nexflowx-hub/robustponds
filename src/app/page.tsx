'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useNavigationStore } from '@/store/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CtaBar from '@/components/sections/CtaBar';
import ProductsPreview from '@/components/sections/ProductsPreview';
import AboutSection from '@/components/sections/AboutSection';
import QuoteSection from '@/components/sections/QuoteSection';
import { ProductListingPage } from '@/components/pages/ProductListingPage';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage';
import { CartPage } from '@/components/pages/CartPage';
import { CheckoutPage } from '@/components/pages/CheckoutPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { QuotePage } from '@/components/pages/QuotePage';
import { TermsPage } from '@/components/pages/TermsPage';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { CookiesPage } from '@/components/pages/CookiesPage';

const PAGE_TITLES: Record<string, string> = {
  home: 'Robustponds® | Equipamentos Frigoríficos Industriais',
  produtos: 'Produtos | Robustponds®',
  produto: 'Detalhes do Produto | Robustponds®',
  carrinho: 'Carrinho de Compras | Robustponds®',
  checkout: 'Checkout | Robustponds®',
  contactos: 'Contactos | Robustponds®',
  orcamento: 'Pedir Orçamento | Robustponds®',
  termos: 'Termos e Condições | Robustponds®',
  privacidade: 'Política de Privacidade | Robustponds®',
  cookies: 'Política de Cookies | Robustponds®',
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  home: 'Especialistas em portas frigoríficas, painéis isotérmicos, cortinas de lamelas, guarda-rail e revestimentos higiénicos.',
  produtos: 'Catálogo de equipamentos frigoríficos industriais — portas, painéis, cortinas e revestimentos.',
  produto: 'Ficha técnica e detalhes do produto.',
  carrinho: 'Revise os seus artigos antes de finalizar a compra.',
  checkout: 'Finalize o seu pedido com pagamento seguro.',
  contactos: 'Entre em contacto com a equipa Robustponds®.',
  orcamento: 'Peça um orçamento gratuito e sem compromisso.',
  termos: 'Termos e Condições gerais de utilização da loja online Robustponds®.',
  privacidade: 'Política de Privacidade e Proteção de Dados (RGPD).',
  cookies: 'Política de Cookies do site Robustponds®.',
};

function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false },
    },
  });
}

export default function Home() {
  const [queryClient] = useState(getQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

function AppShell() {
  const { currentPage, selectedProduct, selectedCategory } = useNavigationStore();

  // Dynamic document title + meta description for SPA navigation
  useEffect(() => {
    const title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
    const description = PAGE_DESCRIPTIONS[currentPage] || PAGE_DESCRIPTIONS.home;
    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update og:title and og:description for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [currentPage]);

  // Update product-specific title
  useEffect(() => {
    if (currentPage === 'produto' && selectedProduct) {
      document.title = `${selectedProduct.name} | Robustponds®`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', selectedProduct.description || selectedProduct.shortDescription || `${selectedProduct.name} — Robustponds®`);
      }
    }
  }, [currentPage, selectedProduct]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'produtos' && <ProductListingPage key={selectedCategory ?? 'all'} />}
        {currentPage === 'produto' && <ProductDetailPage />}
        {currentPage === 'carrinho' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'contactos' && <ContactPage />}
        {currentPage === 'orcamento' && <QuotePage />}
        {currentPage === 'termos' && <TermsPage />}
        {currentPage === 'privacidade' && <PrivacyPage />}
        {currentPage === 'cookies' && <CookiesPage />}
      </div>
      <Footer />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <CtaBar />
      <ProductsPreview />
      <AboutSection />
      <QuoteSection />
    </main>
  );
}
