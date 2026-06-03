'use client';

import {
  Package,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

function formatPrice(priceEur: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceEur);
}

export function CartPage() {
  const { navigate } = useNavigationStore();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-8 lg:px-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('home')} className="cursor-pointer">
                Início
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Carrinho</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center justify-center gap-6 py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-10 text-muted-foreground/60" />
            </div>
            <h2 className="text-2xl font-bold">O seu carrinho está vazio</h2>
            <p className="max-w-md text-center text-muted-foreground">
              Explore os nossos produtos e adicione os itens que precisa ao seu carrinho de compras.
            </p>
          </div>
          <Button size="lg" onClick={() => navigate('produtos')}>
            <Package />
            Ver Produtos
          </Button>
        </div>
      </div>
    );
  }

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
            <BreadcrumbPage>Carrinho</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Carrinho de Compras</h1>
        <p className="mt-1 text-muted-foreground">
          {items.length} artigo{items.length !== 1 ? 's' : ''} no carrinho
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => {
            const lineTotal = item.product.priceEur * item.quantity;
            return (
              <Card key={item.product.id}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  {/* Product Placeholder */}
                  <div
                    className="flex h-24 w-full shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 cursor-pointer sm:w-24"
                    onClick={() => {
                      useNavigationStore.getState().setSelectedProduct(item.product);
                      navigate('produto');
                    }}
                  >
                    <Package className="size-8 text-muted-foreground/60" />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col gap-1">
                    <h3
                      className="cursor-pointer text-sm font-semibold hover:underline"
                      onClick={() => {
                        useNavigationStore.getState().setSelectedProduct(item.product);
                        navigate('produto');
                      }}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      SKU: {item.product.sku}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.product.category}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(lineTotal)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('produtos')}
            >
              <ArrowLeft />
              Continuar a Comprar
            </Button>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={clearCart}
            >
              <Trash2 />
              Limpar Carrinho
            </Button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-[340px]">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items list */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex-1 truncate text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="ml-2 font-medium">
                      {formatPrice(item.product.priceEur * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Envio</span>
                <span className="text-sm font-medium text-muted-foreground">
                  Calculado no checkout
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('checkout')}
              >
                Finalizar Compra
                <ArrowRight />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                IVA incluído em todos os preços
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
