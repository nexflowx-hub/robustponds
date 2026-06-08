'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  Package,
  ShoppingCart,
  FileText,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigationStore } from '@/store/navigation';
import { useCartStore } from '@/store/cart';
import { QuoteModal } from '@/components/shared/QuoteModal';
import { FALLBACK_PRODUCTS } from '@/lib/fallback-products';
import type { Product } from '@/types';
import { CATEGORIES } from '@/types';
import { toast } from 'sonner';

function formatPrice(priceEur: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceEur);
}

// ── Product Card Skeleton ──
function ProductCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-48 w-full rounded-none" />
      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

// ── Main Component ──
export function ProductListingPage() {
  const { navigate, setSelectedProduct } = useNavigationStore();
  const { addItem } = useCartStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [quoteModalProduct, setQuoteModalProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['bootstrap-products'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/bootstrap');
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        return data.products?.length > 0 ? data.products : FALLBACK_PRODUCTS;
      } catch {
        return FALLBACK_PRODUCTS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredProducts = useMemo(() => {
    const list = products ?? FALLBACK_PRODUCTS;
    return list.filter((p) => {
      const matchesSearch =
        search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku ?? '').toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'Todos' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate('produto');
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const handleQuoteRequest = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setQuoteModalProduct(product);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-8 lg:px-12">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('home')} className="cursor-pointer">
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Produtos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Produtos</h1>
        <p className="mt-1 text-muted-foreground">
          {isLoading
            ? 'A carregar produtos...'
            : `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden w-[250px] shrink-0 lg:block">
          <div className="sticky top-24 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Pesquisar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Limpar pesquisa"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <nav className="space-y-1" aria-label="Filtro de categorias">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categorias
              </p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  aria-current={activeCategory === cat ? 'true' : undefined}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && (
                    <X className="size-3" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 space-y-6">
          {/* ── Mobile Search + Category Chips ── */}
          <div className="space-y-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Pesquisar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Limpar pesquisa"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Categorias de produtos">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors min-h-[44px] flex items-center ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Grid ── */}
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 px-6">
              <Package className="mb-4 size-16 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold">Nenhum produto encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
                Tente alterar os filtros ou termos de pesquisa.
              </p>
              <Button
                variant="outline"
                className="mt-4 min-h-[44px]"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('Todos');
                }}
              >
                Limpar Filtros
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => handleProductClick(product)}
                >
                  {/* Product Image Placeholder */}
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <Package className="size-12 text-muted-foreground/60 transition-transform group-hover:scale-110" />
                    {product.priceEur === 0 && (
                      <Badge className="absolute left-3 top-3 bg-amber-500 text-white">
                        B2B
                      </Badge>
                    )}
                    {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
                      <Badge variant="secondary" className="absolute right-3 top-3">
                        Stock baixo
                      </Badge>
                    )}
                  </div>

                  <CardContent className="space-y-3 p-4">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground">{product.category}</p>

                    {/* Name */}
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                      {product.name}
                    </h3>

                    {/* SKU */}
                    <p className="text-xs text-muted-foreground">Ref: {product.sku}</p>

                    {/* Price */}
                    {product.priceEur === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-amber-600">
                          Preço Sob Consulta
                        </span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(product.priceEur)}
                      </p>
                    )}

                    {/* Actions */}
                    {product.priceEur === 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full min-h-[44px]"
                        onClick={(e) => handleQuoteRequest(e, product)}
                      >
                        <FileText />
                        Pedir Orçamento
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full min-h-[44px]"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart />
                        Adicionar ao Carrinho
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        open={!!quoteModalProduct}
        onOpenChange={(open) => {
          if (!open) setQuoteModalProduct(null);
        }}
        product={quoteModalProduct!}
      />
    </div>
  );
}
