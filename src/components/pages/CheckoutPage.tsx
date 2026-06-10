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
  QrCode,
  ShieldCheck,
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
  flag: string;
}> = [
  {
    value: 'card',
    label: 'Cartão de Crédito/Débito',
    icon: <CreditCard className="size-5" />,
    description: 'Visa, Mastercard, Multibanco',
    flag: '🇪🇺',
  },
  {
    value: 'multibanco',
    label: 'Multibanco',
    icon: <Building2 className="size-5" />,
    description: 'Referência de pagamento em caixa ATM ou homebanking',
    flag: '🇵🇹',
  },
  {
    value: 'mbway',
    label: 'MB WAY',
    icon: <Smartphone className="size-5" />,
    description: 'Pagamento instantâneo via aplicação MB WAY',
    flag: '🇵🇹',
  },
  {
    value: 'bizum',
    label: 'Bizum',
    icon: <Wallet className="size-5" />,
    description: 'Pago instantáneo mediante notificación Bizum',
    flag: '🇪🇸',
  },
];

const checkoutSchema = z.object({
  customerEmail: z.string().email('Email inválido'),
  customerName: z.string().min(2, 'Nome é obrigatório (mín. 2 caracteres)'),
  customerPhone: z.string().optional(),
  customerCompany: z.string().optional(),
  customerNif: z.string().optional(),
  mbwayPhone: z.string().optional(),
  bizumPhone: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const { navigate } = useNavigationStore();
  const { items, totalPrice } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [submitting, setSubmitting] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResponse | null>(null);

  const total = totalPrice();

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
      mbwayPhone: '',
      bizumPhone: '',
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
        method: selectedMethod,
        amount: total,
        customer: {
          email: data.customerEmail,
          nif: data.customerNif || undefined,
          birthDate: undefined,
        },
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
        toast.error(result?.message || result?.error || 'Erro ao processar o pedido. Tente novamente.');
      }
    } catch {
      toast.error('Erro de ligação ao servidor de pagamentos. Tente novamente.');
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
            {checkoutResult.message || 'O seu pedido foi processado com sucesso. Consulte os dados abaixo para concluir o pagamento.'}
          </p>

          <Separator className="w-full" />

          {/* Action-specific result views */}
          <div className="w-full space-y-4 text-left">
            {/* Card payment redirect */}
            {checkoutResult.actionType === 'redirect' && checkoutResult.payload.url && (
              <div className="rounded-xl border bg-muted/50 p-5">
                <h3 className="mb-2 text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="size-4 text-primary" />
                  Pagamento por Cartão
                </h3>
                <p className="text-sm text-muted-foreground">
                  Será redirecionado para a página segura de pagamento para introduzir os dados do seu cartão.
                </p>
                <Button
                  className="mt-3 w-full min-h-[44px]"
                  onClick={() => window.open(checkoutResult.payload.url, '_blank')}
                >
                  <ExternalLink />
                  Ir para Pagamento Seguro
                </Button>
              </div>
            )}

            {/* Multibanco reference */}
            {checkoutResult.actionType === 'reference' && (
              <div className="rounded-xl border bg-muted/50 p-5">
                <h3 className="mb-3 text-sm font-semibold flex items-center gap-2">
                  <Building2 className="size-4 text-primary" />
                  Referência Multibanco
                </h3>
                <div className="space-y-3 rounded-lg bg-background p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Entidade:</span>
                    <span className="font-mono text-lg font-bold tracking-wider">{checkoutResult.payload.entity || '—'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Referência:</span>
                    <span className="font-mono text-lg font-bold tracking-wider">{checkoutResult.payload.reference || '—'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Montante:</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Efetue o pagamento em qualquer caixa Multibanco ou serviço de homebanking com os dados acima.
                  O pagamento deve ser efetuado no prazo máximo de 5 dias úteis.
                </p>
              </div>
            )}

            {/* MB WAY QR code */}
            {checkoutResult.actionType === 'qr_code' && checkoutResult.payload.qr_code && (
              <div className="rounded-xl border bg-muted/50 p-5">
                <h3 className="mb-2 text-sm font-semibold flex items-center gap-2">
                  <Smartphone className="size-4 text-primary" />
                  MB WAY
                </h3>
                <p className="text-sm text-muted-foreground">
                  Abra a aplicação MB WAY e confirme o pagamento pendente.
                </p>
                <div className="mt-4 flex items-center justify-center rounded-xl bg-white p-6 dark:bg-card border">
                  <QrCode className="size-36 text-foreground" />
                </div>
                {checkoutResult.payload.transaction_id && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ID Transação: <span className="font-mono">{checkoutResult.payload.transaction_id}</span>
                  </p>
                )}
              </div>
            )}

            {/* Bizum notification */}
            {checkoutResult.actionType === 'notification' && (
              <div className="rounded-xl border bg-muted/50 p-5">
                <h3 className="mb-2 text-sm font-semibold flex items-center gap-2">
                  <Wallet className="size-4 text-primary" />
                  Bizum
                </h3>
                <p className="text-sm text-muted-foreground">
                  Receberá uma notificação Bizum para confirmar o pagamento.
                  Abra a aplicação Bizum e aceite o pagamento pendente.
                </p>
                {checkoutResult.payload.transaction_id && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ID Transacción: <span className="font-mono">{checkoutResult.payload.transaction_id}</span>
                  </p>
                )}
              </div>
            )}

            {/* Bizum redirect */}
            {(checkoutResult.actionType === 'redirect' || checkoutResult.actionType === 'notification') &&
             selectedMethod === 'bizum' && (
              <div className="rounded-xl border bg-muted/50 p-5">
                <h3 className="mb-2 text-sm font-semibold flex items-center gap-2">
                  <Wallet className="size-4 text-primary" />
                  Bizum
                </h3>
                <p className="text-sm text-muted-foreground">
                  Receberá una notificación Bizum para confirmar el pago. Abra la aplicación Bizum y acepte el pago pendiente.
                </p>
                {checkoutResult.payload.transaction_id && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    ID Transacción: <span className="font-mono">{checkoutResult.payload.transaction_id}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full min-h-[44px]"
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
          Complete o seu pedido com pagamento seguro
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
            className="w-fit min-h-[44px]"
            onClick={() => navigate('carrinho')}
          >
            <ArrowLeft />
            Voltar ao Carrinho
          </Button>

          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                Método de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((pm) => (
                  <button
                    type="button"
                    key={pm.value}
                    onClick={() => setSelectedMethod(pm.value)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      selectedMethod === pm.value
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:bg-muted/50 hover:border-muted-foreground/20'
                    }`}
                  >
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                        selectedMethod === pm.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {pm.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{pm.label}</p>
                        <span className="text-base leading-none">{pm.flag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{pm.description}</p>
                    </div>
                    <div
                      className={`size-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === pm.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {selectedMethod === pm.value && (
                        <div className="size-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dynamic fields for payment methods */}
          {(selectedMethod === 'mbway' || selectedMethod === 'bizum') && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {selectedMethod === 'mbway' ? (
                    <Smartphone className="size-5" />
                  ) : (
                    <Wallet className="size-5" />
                  )}
                  {selectedMethod === 'mbway' ? 'Dados MB WAY' : 'Datos Bizum'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
                  {selectedMethod === 'mbway'
                    ? 'O telemóvel deve estar registado na aplicação MB WAY. Receberá uma notificação para confirmar o pagamento.'
                    : 'El teléfono debe estar registrado en Bizum. Recibirá una notificación para confirmar el pago.'}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={selectedMethod === 'mbway' ? 'mbwayPhone' : 'bizumPhone'}>
                    {selectedMethod === 'mbway'
                      ? 'Número Telemóvel MB WAY *'
                      : 'Número de Teléfono Bizum *'}
                  </Label>
                  <Input
                    id={selectedMethod === 'mbway' ? 'mbwayPhone' : 'bizumPhone'}
                    type="tel"
                    placeholder={selectedMethod === 'mbway' ? '+351 912 345 678' : '+34 612 345 678'}
                    {...register(selectedMethod === 'mbway' ? 'mbwayPhone' : 'bizumPhone', {
                      required: selectedMethod === 'mbway' || selectedMethod === 'bizum',
                    })}
                  />
                  {(selectedMethod === 'mbway' ? errors.mbwayPhone : errors.bizumPhone) && (
                    <p className="text-xs text-destructive">
                      {selectedMethod === 'mbway'
                        ? (errors.mbwayPhone?.message || 'Número de telemóvel é obrigatório')
                        : (errors.bizumPhone?.message || 'El número de teléfono es obligatorio')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Multibanco info */}
          {selectedMethod === 'multibanco' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="size-5" />
                  Pagamento Multibanco
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                  Após confirmar o pedido, será gerada uma referência de pagamento Multibanco que poderá utilizar em qualquer caixa Multibanco ou serviço de homebanking.
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                  <Building2 className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• A referência é válida por <strong>5 dias úteis</strong></p>
                    <p>• Pode pagar em qualquer ATM Multibanco ou homebanking</p>
                    <p>• O pagamento é confirmado automaticamente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Card info */}
          {selectedMethod === 'card' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="size-5" />
                  Pagamento por Cartão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200">
                  Pagamento seguro processado via Atlas Core Banking. Será redirecionado para a página segura de pagamento para introduzir os dados do cartão.
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                  <ShieldCheck className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Encriptação SSL/TLS de ponta a ponta</p>
                    <p>• Certificação PCI DSS</p>
                    <p>• Aceita Visa, Mastercard e Multibanco</p>
                  </div>
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
              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={submitting}>
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ShieldCheck />
            )}
            {submitting ? 'A processar...' : `Pagar ${formatPrice(total)}`}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Pagamento seguro processado via Atlas Core Banking · Certificação PCI DSS
          </p>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-[360px]">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex-1 truncate text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="ml-2 font-medium shrink-0">
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
                  {paymentMethods.find((m) => m.value === selectedMethod)?.flag}{' '}
                  {paymentMethods.find((m) => m.value === selectedMethod)?.label}
                </Badge>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" />
                  <span>Pagamento seguro · Atlas Core Banking</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
