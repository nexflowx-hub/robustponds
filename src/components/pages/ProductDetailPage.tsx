'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  FileText,
  Minus,
  Plus,
  Send,
  Loader2,
  Tag,
  Hash,
  Warehouse,
  Euro,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
import { toast } from 'sonner';

function formatPrice(priceEur: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceEur);
}

const FALLBACK_PRODUCTS: Product[] = [
  { id: 'fp-1', name: 'Bomba Submersível KS 100-1', category: 'Bombas Submersíveis', sku: 'BS-KS100-1', priceEur: 289.90, stock: 15, ref: 'REF001', specs: { potência: '1 CV', 'caudal máx.': '100 L/min', 'altura máx.': '10 m' } },
  { id: 'fp-2', name: 'Bomba Submersível KS 200-2', category: 'Bombas Submersíveis', sku: 'BS-KS200-2', priceEur: 449.00, stock: 8, ref: 'REF002', specs: { potência: '2 CV', 'caudal máx.': '200 L/min', 'altura máx.': '15 m' } },
  { id: 'fp-3', name: 'Bomba Submersível Industrial IP 55', category: 'Bombas Submersíveis', sku: 'BS-IP55', priceEur: 0, ref: 'REF003', specs: { potência: '5 CV', 'caudal máx.': '500 L/min', 'altura máx.': '25 m' } },
  { id: 'fp-4', name: 'Bomba de Superfície Centrífuga JP 50', category: 'Bombas de Superfície', sku: 'BP-JP50', priceEur: 179.90, stock: 20, ref: 'REF004', specs: { potência: '0.75 CV', 'caudal máx.': '50 L/min', 'altura máx.': '8 m' } },
  { id: 'fp-5', name: 'Bomba de Superfície Autoaspirante AS 80', category: 'Bombas de Superfície', sku: 'BP-AS80', priceEur: 259.00, stock: 12, ref: 'REF005', specs: { potência: '1 CV', 'caudal máx.': '80 L/min', 'altura máx.': '12 m' } },
  { id: 'fp-6', name: 'Grupo Pressurizador GP 60-24', category: 'Sistemas de Pressurização', sku: 'SP-GP6024', priceEur: 899.00, stock: 5, ref: 'REF007', specs: { potência: '2 CV', 'vaso expansão': '24 L', pressão: '2-6 bar' } },
  { id: 'fp-10', name: 'Filtro de Areia FA 600', category: 'Filtros e Tratamento de Água', sku: 'FT-FA600', priceEur: 129.00, stock: 25, ref: 'REF010', specs: { capacidade: '600 L', 'diâmetro': '500 mm', material: 'Polipropileno' } },
  { id: 'fp-13', name: 'Tubo PVC 110mm (3 metros)', category: 'Acessórios', sku: 'AC-PVC110', priceEur: 12.90, stock: 100, ref: 'REF013', specs: { diâmetro: '110 mm', comprimento: '3 m', material: 'PVC' } },
  { id: 'fp-16', name: 'Kit Solar Bomba KS-SOLAR 300', category: 'Sistemas Solares', sku: 'SS-KSSOL300', priceEur: 2190.00, stock: 2, ref: 'REF016', specs: { 'potência painel': '300 W', 'caudal máx.': '120 L/min', 'altura máx.': '30 m' } },
  { id: 'fp-18', name: 'Bomba de Piscina ECO 1.5 CV', category: 'Piscinas', sku: 'PC-ECO15', priceEur: 349.00, stock: 10, ref: 'REF018', specs: { potência: '1.5 CV', 'caudal máx.': '160 L/min', compatível: 'Água salgada' } },
];

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
            <Label htmlFor="detail-quote-name">Nome *</Label>
            <Input
              id="detail-quote-name"
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              placeholder="Seu nome"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detail-quote-email">Email *</Label>
            <Input
              id="detail-quote-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              placeholder="email@exemplo.pt"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="detail-quote-phone">Telefone</Label>
              <Input
                id="detail-quote-phone"
                value={formData.phone}
                onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+351 ..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="detail-quote-company">Empresa</Label>
              <Input
                id="detail-quote-company"
                value={formData.company}
                onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                placeholder="Nome da empresa"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detail-quote-message">Mensagem</Label>
            <Textarea
              id="detail-quote-message"
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

// ── Main Component ──
export function ProductDetailPage() {
  const { selectedProduct, navigate, setSelectedProduct } = useNavigationStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ['bootstrap-products-detail'],
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

  const relatedProducts = useMemo(() => {
    if (!selectedProduct || !allProducts) return [];
    return allProducts
      .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 4);
  }, [selectedProduct, allProducts]);

  if (!selectedProduct) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Package className="size-16 text-muted-foreground/40" />
        <p className="text-muted-foreground">Nenhum produto selecionado.</p>
        <Button onClick={() => navigate('produtos')}>Ver Produtos</Button>
      </div>
    );
  }

  const product = selectedProduct;
  const isB2B = product.priceEur === 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} adicionado ao carrinho`);
    setQuantity(1);
  };

  const handleRelatedClick = (p: Product) => {
    setSelectedProduct(p);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <BreadcrumbLink onClick={() => navigate('produtos')} className="cursor-pointer">
              Produtos
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[200px] truncate">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-fit"
        onClick={() => navigate('produtos')}
      >
        <ArrowLeft />
        Voltar aos Produtos
      </Button>

      {/* Product Main Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Placeholder */}
        <div className="relative flex min-h-[300px] items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 md:min-h-[400px]">
          <Package className="size-24 text-muted-foreground/40" />
          {isB2B && (
            <Badge className="absolute left-4 top-4 bg-amber-500 text-white text-sm px-3 py-1">
              B2B
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          </div>

          <Separator />

          {/* Price */}
          <div>
            {isB2B ? (
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-amber-600">
                  Preço Sob Consulta
                </span>
                <Badge className="bg-amber-500 text-white">B2B</Badge>
              </div>
            ) : (
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product.priceEur)}
              </p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              IVA incluído
            </p>
          </div>

          <Separator />

          {/* Quantity + Add to Cart */}
          {product.stock !== undefined && product.stock > 0 && !isB2B && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantidade:</span>
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            {isB2B ? (
              <Button size="lg" className="flex-1" onClick={() => setQuoteOpen(true)}>
                <FileText />
                Pedir Orçamento
              </Button>
            ) : (
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart />
                Adicionar ao Carrinho
              </Button>
            )}
          </div>

          <Separator />

          {/* Specs Grid */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Ficha Técnica
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <Tag className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Categoria</p>
                  <p className="text-sm font-medium">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <Hash className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Referência</p>
                  <p className="text-sm font-medium">{product.ref || product.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <Warehouse className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className="text-sm font-medium">
                    {product.stock !== undefined && product.stock > 0
                      ? `${product.stock} unidades`
                      : 'Sob consulta'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <Euro className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Preço</p>
                  <p className="text-sm font-medium">
                    {isB2B ? 'Sob consulta' : formatPrice(product.priceEur)}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col rounded-lg border p-3"
                  >
                    <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Descrição
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Produtos Relacionados</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <Card
                key={rp.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => handleRelatedClick(rp)}
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <Package className="size-10 text-muted-foreground/60" />
                </div>
                <CardContent className="space-y-2 p-3">
                  <p className="text-xs text-muted-foreground">{rp.category}</p>
                  <h4 className="text-sm font-semibold line-clamp-2">{rp.name}</h4>
                  <p className="text-xs text-muted-foreground">{rp.sku}</p>
                  {rp.priceEur === 0 ? (
                    <p className="text-sm font-medium text-amber-600">Preço Sob Consulta</p>
                  ) : (
                    <p className="text-sm font-bold text-primary">{formatPrice(rp.priceEur)}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={product}
      />
    </div>
  );
}
