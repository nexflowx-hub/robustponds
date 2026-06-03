'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNavigationStore } from '@/store/navigation'
import { useCartStore } from '@/store/cart';
import { CATEGORIES } from '@/types';
import {
  Phone,
  Mail,
  Menu,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const BRAND_RED = '#C52023';

const NAV_LINKS = [
  { label: 'Início', page: 'inicio' as const },
  { label: 'Produtos', page: 'produtos' as const, hasDropdown: true },
  { label: 'Contactos', page: 'contactos' as const },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentPage, navigate } = useNavigationStore();
  const totalItems = useCartStore((s) => s.totalItems);
  const cartCount = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setProductsOpen(false), 200);
  };

  const handleNavClick = (page: string) => {
    navigate(page as 'inicio' | 'produtos' | 'contactos');
    setMobileOpen(false);
  };

  const handleCategoryClick = (slug: string) => {
    navigate('produtos-categoria', slug);
    setMobileOpen(false);
  };

  const isActive = (page: string) => currentPage === page;

  const filteredCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <header className="w-full">
      {/* ── Top action bar ── */}
      <div className="hidden lg:block bg-[#2C2C2C] text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a
              href="tel:+351261963343"
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <Phone className="size-3.5" />
              <span>+351 261 963 343</span>
            </a>
            <a
              href="mailto:orcamentos@robustponds.pt"
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <Mail className="size-3.5" />
              <span>orcamentos@robustponds.pt</span>
            </a>
          </div>
          <span className="text-white/60 text-xs">
            Chamada para a rede fixa nacional
          </span>
        </div>
      </div>

      {/* ── Main navigation ── */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-robustponds.png"
              alt="Robustponds"
              width={200}
              height={50}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.page}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50"
                    style={{
                      color: isActive(link.page) ? BRAND_RED : '#333',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        productsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {productsOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                        {filteredCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.slug)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C52023] transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50"
                  style={{
                    color: isActive(link.page) ? BRAND_RED : '#333',
                  }}
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => handleNavClick('carrinho')}
              className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag className="size-5 text-gray-700" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-0.5 -right-0.5 h-5 min-w-5 flex items-center justify-center bg-[#C52023] text-white text-[10px] font-bold border-2 border-white"
                  style={{ backgroundColor: BRAND_RED }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </button>

            {/* Mobile menu trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 max-w-[85vw] p-0 overflow-y-auto">
                  {/* Mobile header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <Image
                      src="/logo-robustponds.png"
                      alt="Robustponds"
                      width={150}
                      height={38}
                      className="h-8 w-auto"
                    />
                  </div>

                  {/* Mobile nav links */}
                  <div className="p-4">
                    <nav className="flex flex-col gap-1">
                      {NAV_LINKS.filter((l) => !l.hasDropdown).map((link) => (
                        <button
                          key={link.page}
                          onClick={() => handleNavClick(link.page)}
                          className="w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors"
                          style={{
                            color: isActive(link.page) ? BRAND_RED : '#333',
                            backgroundColor: isActive(link.page)
                              ? 'rgba(197, 32, 35, 0.06)'
                              : 'transparent',
                          }}
                        >
                          {link.label}
                        </button>
                      ))}

                      {/* Products section */}
                      <button
                        onClick={() => handleNavClick('produtos')}
                        className="w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors"
                        style={{
                          color: isActive('produtos') ? BRAND_RED : '#333',
                          backgroundColor: isActive('produtos')
                            ? 'rgba(197, 32, 35, 0.06)'
                            : 'transparent',
                        }}
                      >
                        Produtos
                      </button>

                      {/* Category sub-items */}
                      <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                        {filteredCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.slug)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-[#C52023] hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>

                      <div className="h-px bg-gray-200 my-2" />

                      {/* Orçamento link */}
                      <button
                        onClick={() => handleNavClick('orcamento')}
                        className="w-full text-left px-4 py-3 text-base font-medium rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                      >
                        Pedir Orçamento
                      </button>
                    </nav>
                  </div>

                  {/* Mobile contact info */}
                  <div className="mt-auto p-4 border-t bg-gray-50">
                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:+351261963343"
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#C52023] transition-colors"
                      >
                        <Phone className="size-4 flex-shrink-0" />
                        <span>+351 261 963 343</span>
                      </a>
                      <a
                        href="mailto:orcamentos@robustponds.pt"
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#C52023] transition-colors"
                      >
                        <Mail className="size-4 flex-shrink-0" />
                        <span>orcamentos@robustponds.pt</span>
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        Chamada para a rede fixa nacional
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
