'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Copy,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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
import type { PaymentMethod, CheckoutResponse } from '@/types';
import { toast } from 'sonner';

function formatPrice(priceEur: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceEur);
}

const paymentMethods: Array<{
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    value: 'card',
    label: 'Cartão de Crédito/Débito',
    icon: <CreditCard className="size-5" />,
    description: 'Visa, Mastercard, Multibanco',
  },
  {
    value: 'multibanco',
    label: 'Multibanco',
    icon: <Building2 className="size-5" />,
    description: 'Referência de pagamento',
  },
  {
    value: 'mbway',
    label: 'MB WAY',
    icon: <Smartphone className="size-5" />,
    description: 'Pagamento via aplicação MB WAY',
  },
  {
    value: 'crypto',
    label: 'Criptomoedas',
    icon: <Wallet className="size-5" />,
    description: 'Bitcoin, Ethereum, USDT',
  },
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Nome é obrigatório (mín. 2 caracteres)'),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().optional(),
  customerCompany: z.string().optional(),
  customerNif: z.string().optional(),
  birthDate: z.string().optional(),
  mbwayPhone: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const { navigate } = useNavigationStore();
  const { items, subtotal } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [submitting, setSubmitting] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResponse | null>(null);

  const total = subtotal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerCompany: '',
      customerNif: '',
      birthDate: '',
      mbwayPhone: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error('Carrinho vazio. Adicione produtos antes de finalizar.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        store: 'robustponds-shop',
        method: selectedMethod,
        amount: total,
        customer: {
          email: data.customerEmail,
          name: data.customerName,
          nif: data.customerNif || undefined,
          birthDate: data.birthDate || undefined,
        },
        cart: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          priceEur: item.product.priceEur,
        })),
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result) {
        setCheckoutResult(result);
        toast.success('Pedido processado com sucesso!');
      } else {
        toast.error(result?.message || 'Erro ao processar o pedido. Tente novamente.');
      }
    } catch {
      toast.error('Erro de ligação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !checkoutResult) {
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
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-muted-foreground">O seu carrinho está vazio.</p>
          <Button onClick={() => navigate('produtos')}>Ver Produtos</Button>
        </div>
      </div>
    );
  }

  // ── Checkout Result View ──
  if (checkoutResult) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 py-12 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold">Pedido Recebido!</h1>
          <p className="text-muted-foreground">
            {checkoutResult.message || 'O seu pedido foi processado com sucesso.'}
          </p>

          <Separator className="w-full" />

          {/* Action-specific details */}
          <div className="w-full space-y-4 text-left">
            {checkoutResult.actionType === 'redirect' && checkoutResult.actionData.url && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Pagamento por Cartão</h3>
                <p className="text-sm text-muted-foreground">
                  Será redirecionado para a página segura de pagamento.
                </p>
                <Button
                  className="mt-3 w-full"
                  onClick={() => window.open(checkoutResult.actionData.url, '_blank')}
                >
                  <ExternalLink />
                  Ir para Pagamento Seguro
                </Button>
              </div>
            )}

            {checkoutResult.actionType === 'reference' && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Referência Multibanco</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entidade:</span>
                    <span className="font-mono font-semibold">{checkoutResult.actionData.entity || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Referência:</span>
                    <span className="font-mono font-semibold">{checkoutResult.actionData.reference || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montante:</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Efetue o pagamento no Multibanco ou homebanking com os dados acima.
                </p>
              </div>
            )}

            {checkoutResult.actionType === 'qr_code' && checkoutResult.actionData.qr_code && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 text-sm font-semibold">MB WAY</h3>
                <p className="text-sm text-muted-foreground">
                  Abra a aplicação MB WAY e confirme o pagamento pendente.
                </p>
                <div className="mt-3 flex items-center justify-center rounded-lg bg-white p-4 dark:bg-card">
                  <QrCode className="size-32 text-foreground" />
                </div>
                {checkoutResult.actionData.transaction_id && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    ID Transação: {checkoutResult.actionData.transaction_id}
                  </p>
                )}
              </div>
            )}

            {checkoutResult.actionType === 'address' && checkoutResult.actionData.address && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Pagamento Cripto</h3>
                <p className="text-sm text-muted-foreground">
                  Envie o montante exato para a seguinte morada:
                </p>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-background p-3">
                  <code className="flex-1 break-all text-xs font-mono">
                    {checkoutResult.actionData.address}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(checkoutResult.actionData.address);
                      toast.success('Morada copiada!');
                    }}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
                {checkoutResult.actionData.network && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Rede: {checkoutResult.actionData.network}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  O pagamento será confirmado após a verificação na blockchain.
                </p>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              useCartStore.getState().clearCart();
              setCheckoutResult(null);
              navigate('home');
            }}
          >
            Voltar à Página Inicial
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
            <BreadcrumbLink onClick={() => navigate('carrinho')} className="cursor-pointer">
              Carrinho
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Checkout</h1>
        <p className="mt-1 text-muted-foreground">
          Complete o seu pedido
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
          {/* Back to Cart */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-fit"
            onClick={() => navigate('carrinho')}
          >
            <ArrowLeft />
            Voltar ao Carrinho
          </Button>

          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((pm) => (
                <button
                  type="button"
                  key={pm.value}
                  onClick={() => setSelectedMethod(pm.value)}
                  className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                    selectedMethod === pm.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${
                      selectedMethod === pm.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {pm.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{pm.label}</p>
                    <p className="text-xs text-muted-foreground">{pm.description}</p>
                  </div>
                  <div
                    className={`size-4 rounded-full border-2 ${
                      selectedMethod === pm.value
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground/30'
                    }`}
                  >
                    {selectedMethod === pm.value && (
                      <div className="flex size-full items-center justify-center">
                        <div className="size-1.5 rounded-full bg-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Dynamic fields for payment methods */}
          {selectedMethod === 'mbway' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="size-5" />
                  Dados MB WAY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="mbwayPhone">
                    Número Telemóvel MB WAY *
                  </Label>
                  <Input
                    id="mbwayPhone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    {...register('mbwayPhone', {
                      required: selectedMethod === 'mbway',
                    })}
                  />
                  {errors.mbwayPhone && (
                    <p className="text-xs text-destructive">{errors.mbwayPhone.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    O telemóvel deve estar registado na aplicação MB WAY.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMethod === 'crypto' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="size-5" />
                  Verificação KYC/AML
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                  Devido a requisitos regulatórios, pagamentos com criptomoedas necessitam de verificação adicional.
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cryptoNif">
                    NIF (Número de Identificação Fiscal) *
                  </Label>
                  <Input
                    id="cryptoNif"
                    placeholder="123456789"
                    {...register('customerNif', {
                      required: selectedMethod === 'crypto',
                    })}
                  />
                  {errors.customerNif && (
                    <p className="text-xs text-destructive">{errors.customerNif.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="birthDate">
                    Data de Nascimento *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    {...register('birthDate', {
                      required: selectedMethod === 'crypto',
                    })}
                  />
                  {errors.birthDate && (
                    <p className="text-xs text-destructive">{errors.birthDate.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="customerName">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerName"
                  placeholder="João Silva"
                  {...register('customerName')}
                />
                {errors.customerName && (
                  <p className="text-xs text-destructive">{errors.customerName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerEmail">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="joao@exemplo.pt"
                  {...register('customerEmail')}
                />
                {errors.customerEmail && (
                  <p className="text-xs text-destructive">{errors.customerEmail.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerPhone">Telefone</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="+351 261 963 343"
                  {...register('customerPhone')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerCompany">Empresa / NIF</Label>
                <Input
                  id="customerCompany"
                  placeholder="Nome da empresa ou NIF"
                  {...register('customerCompany')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CreditCard />
            )}
            {submitting ? 'A processar...' : `Pagar ${formatPrice(total)}`}
          </Button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-[340px]">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  A calcular
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <Badge variant="secondary" className="w-full justify-center py-1.5">
                Pagamento: {paymentMethods.find((m) => m.value === selectedMethod)?.label}
              </Badge>

              <p className="text-center text-xs text-muted-foreground">
                Pagamento seguro processado via Atlas Core
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
