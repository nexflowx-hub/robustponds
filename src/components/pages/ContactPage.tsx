'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
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

export function ContactPage() {
  const { navigate } = useNavigationStore();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

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
        body: JSON(formData),
      });
      if (res.ok) {
        setSent(true);
        toast.success('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch {
      toast.error('Erro de ligação. Tente novamente.');
    } finally {
      setLoading(false);
    }
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
            <BreadcrumbPage>Contactos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Contactos</h1>
        <p className="mt-1 text-muted-foreground">
          Entre em contacto connosco para qualquer questão ou orçamento.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Contact Form */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Mensagem Enviada!</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Obrigado pelo seu contacto. Responderemos o mais brevemente possível.
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-name">
                        Nome <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-email"
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
                      <Label htmlFor="contact-phone">Telefone</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+351 ..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-company">Empresa</Label>
                      <Input
                        id="contact-company"
                        value={formData.company}
                        onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-subject">Assunto</Label>
                    <Input
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="Assunto da mensagem"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact-message">
                      Mensagem <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Escreva a sua mensagem..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Send />}
                    {loading ? 'A enviar...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Sidebar */}
        <aside className="w-full lg:w-[380px]">
          <div className="space-y-4">
            {/* Phone */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Telefone</p>
                  <a
                    href="tel:+351261963343"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    +351 261 963 343
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <a
                    href="mailto:info@robustponds.shop"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    info@robustponds.shop
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <MessageCircle className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">WhatsApp</p>
                  <a
                    href="https://wa.me/351261963343"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                  >
                    Enviar mensagem
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Morada</p>
                  <p className="text-sm font-semibold">
                    Portugal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Horário de Funcionamento</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segunda – Sexta</span>
                    <span className="font-medium">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábado</span>
                    <span className="font-medium">09:00 – 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingo</span>
                    <span className="font-medium text-muted-foreground">Encerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-muted/30">
              <div className="text-center">
                <MapPin className="mx-auto mb-2 size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Mapa</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
