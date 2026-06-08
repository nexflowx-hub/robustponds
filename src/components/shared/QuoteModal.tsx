'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import type { Product } from '@/types';
import { toast } from 'sonner';

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function QuoteModal({ open, onOpenChange, product }: QuoteModalProps) {
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pedir Orçamento</DialogTitle>
          <DialogDescription>
            Produto: <span className="font-medium text-foreground">{product.name}</span>
            {product.sku && <span className="text-muted-foreground"> ({product.sku})</span>}
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
              autoComplete="name"
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
              autoComplete="email"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quote-phone">Telefone</Label>
              <Input
                id="quote-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+351 ..."
                autoComplete="tel"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote-company">Empresa</Label>
              <Input
                id="quote-company"
                value={formData.company}
                onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                placeholder="Nome da empresa"
                autoComplete="organization"
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
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            Enviar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
