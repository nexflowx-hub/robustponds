'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  Package,
  ShoppingCart,
  FileText,
  X,
  Send,
  Loader2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
import type { Product } from '@/types';
import { CATEGORIES } from '@/types';
import { toast } from 'sonner';

// ── Fallback Products ──
const FALLBACK_PRODUCTS: Product[] = [
  { id: 'fp-1', name: 'Porta Frigorífica KS 100-1', category: 'Portas', sku: 'BS-KS100-1', priceEur: 289.90, stock: 15, ref: 'REF001', specs: { potência: '1 CV', 'caudal máx.': '100 L/min', 'altura máx.': '10 m' } },
  { id: 'fp-2', name: 'Porta Frigorífica KS 200-2', category: 'Portas', sku: 'BS-KS200-2', priceEur: 449.00, stock: 8, ref: 'REF002', specs: { potência: '2 CV', 'caudal máx.': '200 L/min', 'altura máx.': '15 m' } },
  { id: 'fp-3', name: 'Porta Frigorífica Industrial IP 55', category: 'Portas', sku: 'BS-IP55', priceEur: 0, ref: 'REF003', specs: { potência: '5 CV', 'caudal máx.': '500 L/min', 'altura máx.': '25 m' } },
  { id: 'fp-4', name: 'Complemento Industrial Centrífuga JP 50', category: 'Complementos', sku: 'BP-JP50', priceEur: 179.90, stock: 20, ref: 'REF004', specs: { potência: '0.75 CV', 'caudal máx.': '50 L/min', 'altura máx.': '8 m' } },
  { id: 'fp-5', name: 'Complemento Industrial Autoaspirante AS 80', category: 'Complementos', sku: 'BP-AS80', priceEur: 259.00, stock: 12, ref: 'REF005', specs: { potência: '1 CV', 'caudal máx.': '80 L/min', 'altura máx.': '12 m' } },
  { id: 'fp-6', name: 'Complemento Industrial Multi-Etapa ME 100', category: 'Complementos', sku: 'BP-ME100', priceEur: 0, ref: 'REF006', specs: { potência: '1.5 CV', 'caudal máx.': '100 L/min', 'altura máx.': '20 m' } },
  { id: 'fp-7', name: 'Grupo Pressurizador GP 60-24', category: 'Cortina de Lamelas', sku: 'SP-GP6024', priceEur: 899.00, stock: 5, ref: 'REF007', specs: { potência: '2 CV', 'vaso expansão': '24 L', pressão: '2-6 bar' } },
  { id: 'fp-8', name: 'Cortina de Lamelas Residencial RP 200', category: 'Cortina de Lamelas', sku: 'SP-RP200', priceEur: 1250.00, stock: 3, ref: 'REF008', specs: { potência: '3 CV', 'vaso expansão': '60 L', pressão: '2-8 bar' } },
  { id: 'fp-9', name: 'Cortina de Lamelas Comercial CP 500', category: 'Cortina de Lamelas', sku: 'SP-CP500', priceEur: 0, ref: 'REF009', specs: { potência: '7.5 CV', 'vaso expansão': '200 L', pressão: '3-10 bar' } },
  { id: 'fp-10', name: 'Filtro de Areia FA 600', category: 'Painel', sku: 'FT-FA600', priceEur: 129.00, stock: 25, ref: 'REF010', specs: { capacidade: '600 L', 'diâmetro': '500 mm', material: 'Polipropileno' } },
  { id: 'fp-11', name: 'Filtro Magnético FM 100', category: 'Painel', sku: 'FT-FM100', priceEur: 89.90, stock: 30, ref: 'REF011', specs: { 'diâmetro conexão': '1"', material: 'Latão niquelado' } },
  { id: 'fp-12', name: 'Câmara de Decantação CD 2000', category: 'Painel', sku: 'FT-CD2000', priceEur: 0, ref: 'REF012', specs: { capacidade: '2000 L', material: 'PEAD' } },
  { id: 'fp-13', name: 'Tubo PVC 110mm (3 metros)', category: 'Proteção', sku: 'AC-PVC110', priceEur: 12.90, stock: 100, ref: 'REF013', specs: { diâmetro: '110 mm', comprimento: '3 m', material: 'PVC' } },
  { id: 'fp-14', name: 'Kit Uniões Flexíveis KUF 6pcs', category: 'Proteção', sku: 'AC-KUF6', priceEur: 24.90, stock: 50, ref: 'REF014', specs: { quantidade: '6 peças', 'diâmetro': '1" 1/4' } },
  { id: 'fp-15', name: 'Cabo Elétrico Submersível 50m', category: 'Proteção', sku: 'AC-CES50', priceEur: 0, ref: 'REF015', specs: { comprimento: '50 m', secção: '3x2.5 mm²' } },
  { id: 'fp-16', name: 'Kit Solar porta KS-SOLAR 300', category: 'Revestimentos Higiénicos', sku: 'SS-KSSOL300', priceEur: 2190.00, stock: 2, ref: 'REF016', specs: { 'potência painel': '300 W', 'caudal máx.': '120 L/min', 'altura máx.': '30 m' } },
  { id: 'fp-17', name: 'Porta Seccionada para portas ISB 1000', category: 'Revestimentos Higiénicos', sku: 'SS-ISB1000', priceEur: 0, ref: 'REF017', specs: { potência: '1.1 kW', 'tensão entrada': '100-500 V DC' } },
  { id: 'fp-18', name: 'porta de Porta Rápida ECO 1.5 CV', category: 'Portas', sku: 'PC-ECO15', priceEur: 349.00, stock: 10, ref: 'REF018', specs: { potência: '1.5 CV', 'caudal máx.': '160 L/min', compatível: 'Água salgada' } },
  { id: 'fp-19', name: 'Filtro de Porta Rápida FP 800', category: 'Portas', sku: 'PC-FP800', priceEur: 0, ref: 'REF019', specs: { capacidade: '800 L', 'diâmetro': '600 mm' } },
];

function formatPrice(priceEur: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceEur);
}

// ── Quote Modal ──
function QuoteModal({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Preencha o nome e email obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Pedido de Orçamento - ${product.name}`,
          product: product.name,
          sku: product.sku,
        }),
      });
      if (res.ok) {
        toast.success('Pedido de orçamento enviado com sucesso!');
        onOpenChange(false);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        toast.error('Erro ao enviar pedido. Tente novamente.');
      }
    } catch {
      toast.error('Erro de ligação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pedir Orçamento</DialogTitle>
          <DialogDescription>
            Produto: <span className="font-medium text-foreground">{product.name}</span> ({product.sku})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="quote-name">Nome *</Label>
            <Input
              id="quote-name"
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              placeholder="Seu nome"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-email">Email *</Label>
            <Input
              id="quote-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              placeholder="email@exemplo.pt"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quote-phone">Telefone</Label>
              <Input
                id="quote-phone"
                value={formData.phone}
                onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+351 ..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote-company">Empresa</Label>
              <Input
                id="quote-company"
                value={formData.company}
                onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                placeholder="Nome da empresa"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-message">Mensagem</Label>
            <Textarea
              id="quote-message"
              value={formData.message}
              onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
              placeholder="Detalhes adicionais sobre o seu pedido..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            Enviar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
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
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
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
        <h1 className="text-2xl font-bold md:text-3xl">Produtos</h1>
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
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <nav className="space-y-1">
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
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16">
              <Package className="mb-4 size-16 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold">Nenhum produto encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente alterar os filtros ou termos de pesquisa.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('Todos');
                }}
              >
                Limpar Filtros
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                        className="w-full"
                        onClick={(e) => handleQuoteRequest(e, product)}
                      >
                        <FileText />
                        Pedir Orçamento
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
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
