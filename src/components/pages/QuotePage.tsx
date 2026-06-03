'use client';

import { useState } from 'react';
import {
  Send,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Package,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigationStore } from '@/store/navigation';
import { toast } from 'sonner';

export function QuotePage() {
  const { navigate, prefillProduct } = useNavigationStore();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantityNum: 1,
    specs: '',
    message: '',
  });

  // Auto-fill product from navigation store on initial render
  // (this only runs once because the navigation store sets prefillProduct transiently)
  const [initialized, setInitialized] = useState(false);
  if (prefillProduct && !initialized) {
    setInitialized(true);
    setFormData((f) => ({
      ...f,
      product: `${prefillProduct}`,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON({
          ...formData,
          quantity: quantity,
          subject: `Pedido de Orçamento - ${formData.product || 'Geral'}`,
        }),
      });
      if (res.ok) {
        setSent(true);
        toast.success('Pedido de orçamento enviado com sucesso!');
      } else {
        toast.error('Erro ao enviar pedido. Tente novamente.');
      }
    } catch {
      toast.error('Erro de ligação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = formData.product
    ? `Olá! Gostaria de pedir um orçamento para o produto: ${formData.product}. Quantidade: ${quantity}. Obrigado!`
    : 'Olá! Gostaria de pedir um orçamento. Obrigado!';

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
            <BreadcrumbPage>Pedir Orçamento</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Pedir Orçamento</h1>
        <p className="mt-1 text-muted-foreground">
          Solicite um orçamento personalizado para os produtos que necessita.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Form */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Formulário de Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Pedido Enviado!</h3>
                  <p className="max-w-md text-center text-sm text-muted-foreground">
                    Obrigado pelo seu pedido de orçamento. A nossa equipa analisará o seu pedido e
                    responderá o mais brevemente possível.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setSent(false)}>
                      Novo Pedido
                    </Button>
                    <Button onClick={() => navigate('produtos')}>
                      <Package />
                      Ver Produtos
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="quote-name">
                        Nome <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quote-name"
                        value={formData.name}
                        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="quote-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quote-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                        placeholder="email@exemplo.pt"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="quote-phone">Telefone</Label>
                      <Input
                        id="quote-phone"
                        type="tel"
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
                    <Label htmlFor="quote-product">Produto</Label>
                    <Input
                      id="quote-product"
                      value={formData.product}
                      onChange={(e) => setFormData((f) => ({ ...f, product: e.target.value }))}
                      placeholder="Nome do produto ou referência"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Quantidade</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setQuantity((q) => q + 1)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quote-specs">Especificações Técnicas</Label>
                    <Textarea
                      id="quote-specs"
                      value={formData.specs}
                      onChange={(e) => setFormData((f) => ({ ...f, specs: e.target.value }))}
                      placeholder="Especificações adicionais (dimensões, potência, caudal, etc.)"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quote-message">
                      Mensagem <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="quote-message"
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Descreva o que necessita, local de instalação, prazo pretendido, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Send />}
                    {loading ? 'A enviar...' : 'Enviar Pedido de Orçamento'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[340px]">
          <div className="space-y-4">
            {/* WhatsApp Quick Action */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <MessageCircle className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Orçamento Rápido via WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Resposta em minutos</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/351261963343?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle />
                    Contactar via WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Como Funciona
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      Preencha o formulário com os detalhes do produto que necessita.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      A nossa equipa analisa o pedido e prepara uma proposta personalizada.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      Recebe o orçamento por email ou WhatsApp no prazo de 24-48 horas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Contacto Direto
                </h3>
                <p className="text-sm">
                  📞 <a href="tel:+351261963343" className="font-medium hover:text-primary">+351 261 963 343</a>
                </p>
                <p className="text-sm">
                  ✉️ <a href="mailto:info@robustponds.shop" className="font-medium hover:text-primary">info@robustponds.shop</a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Segunda – Sexta: 09:00 – 18:00
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
