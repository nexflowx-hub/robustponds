'use client';

import { useState } from 'react';
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
  const { currentPage } = useNavigationStore();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'produtos' && <ProductListingPage />}
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
