'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Shield, Scale, Clock, Headphones } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';
import { CATEGORIES } from '@/types';

const INFO_LINKS = [
  { label: 'Contactos', page: 'contactos' as const },
  { label: 'Pedir Orçamento', page: 'orcamento' as const },
  { label: 'Termos e Condições', page: 'termos' as const },
  { label: 'Política de Privacidade', page: 'privacidade' as const },
  { label: 'Política de Cookies', page: 'cookies' as const },
];

const PAYMENT_ICONS = [
  { src: '/icons/multibanco.svg', alt: 'Multibanco' },
  { src: '/icons/mbway.svg', alt: 'MB WAY' },
  { src: '/icons/bizum.svg', alt: 'Bizum' },
  { src: '/icons/visa.svg', alt: 'Visa' },
  { src: '/icons/mastercard.svg', alt: 'Mastercard' },
];

export default function Footer() {
  const navigate = useNavigationStore((s) => s.navigate);

  const handleCategoryClick = (category: string) => {
    navigate('produtos', category);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* ── Col 1: Brand + Company Info ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Image
              src="/logo-robustponds.png"
              alt="Robustponds® - Equipamentos Frigoríficos Industriais"
              width={160}
              height={74}
              className="h-14 w-auto mb-4 brightness-0 invert"
              priority
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Especialistas em equipamentos frigoríficos industriais e
              comercialização de produtos para câmaras frias, portas
              frigoríficas, painéis isotérmicos e muito mais.
            </p>

            {/* Company Legal Identification */}
            <div className="bg-white/5 rounded-lg p-4 mb-5 space-y-1.5">
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <Shield className="size-3.5 flex-shrink-0 text-[#C52023] mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-300">ROBUSTPONDS - COMÉRCIO DE EQUIPAMENTOS, LDA.</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 pl-5.5 space-y-1">
                <p><span className="text-gray-400 font-medium">NIF:</span> 516 123 456</p>
                <p><span className="text-gray-400 font-medium">Capital Social:</span> €5.000,00</p>
                <p><span className="text-gray-400 font-medium">Matriculada na CRC:</span> Torres Vedras</p>
                <p><span className="text-gray-400 font-medium">NIPC:</span> 516 123 456</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+351261963343"
                className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <Phone className="size-4 flex-shrink-0 text-[#C52023] group-hover:scale-110 transition-transform" />
                <span>+351 261 963 343</span>
              </a>
              <a
                href="mailto:geral@robustponds.pt"
                className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <Mail className="size-4 flex-shrink-0 text-[#C52023] group-hover:scale-110 transition-transform" />
                <span>geral@robustponds.pt</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-gray-300">
                <MapPin className="size-4 flex-shrink-0 text-[#C52023] mt-0.5" />
                <span className="text-gray-400">
                  Zona Industrial, Apartado 123<br />
                  2560-000 Torres Vedras, Portugal
                </span>
              </div>
            </div>
          </div>

          {/* ── Col 2: Produtos ── */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-200">
              Produtos
            </h4>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.filter((c) => c !== 'Todos').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Informação Legal ── */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-200">
              Informação
            </h4>
            <ul className="flex flex-col gap-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Arbitragem */}
            <div className="mt-6 flex items-start gap-2.5">
              <Scale className="size-4 flex-shrink-0 text-[#C52023] mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-300">
                  Centro de Arbitragem
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  CAC de Lisboa — Conflitos de Consumo
                </p>
              </div>
            </div>
          </div>

          {/* ── Col 4: Apoio ao Cliente + Livro de Reclamações + Pagamentos ── */}
          <div className="sm:col-span-2 lg:col-span-4">
            {/* Pós-Venda / Apoio ao Cliente */}
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-200">
              Apoio ao Cliente
            </h4>
            <div className="bg-white/5 rounded-lg p-4 mb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <Headphones className="size-4 flex-shrink-0 text-[#C52023]" />
                  <div>
                    <p className="text-xs font-semibold text-gray-300">Suporte Pós-Venda</p>
                    <a
                      href="tel:+351261963343"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      +351 261 963 343
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 flex-shrink-0 text-[#C52023]" />
                  <div>
                    <p className="text-xs font-semibold text-gray-300">Assistência Técnica</p>
                    <a
                      href="mailto:suporte@robustponds.pt"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      suporte@robustponds.pt
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 flex-shrink-0 text-[#C52023]" />
                  <div>
                    <p className="text-xs font-semibold text-gray-300">Horário de Atendimento</p>
                    <p className="text-sm text-gray-400">
                      Seg–Sex: 9h00–18h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Livro de Reclamações */}
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#C52023]/10 hover:bg-[#C52023]/20 border border-[#C52023]/30 rounded-lg px-4 py-3 group transition-all duration-200"
              aria-label="Livro de Reclamações - Efetuar reclamação online"
            >
              <Image
                src="/icons/livro-reclamacoes.svg"
                alt="Livro de Reclamações"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#C52023] group-hover:text-red-400 transition-colors">
                  Livro de Reclamações
                </span>
                <span className="text-[10px] text-gray-500">
                  Disponível na loja e online
                </span>
              </div>
            </a>

            {/* Meios de Pagamento */}
            <div className="mt-5">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Meios de Pagamento Aceites
              </h5>
              <div className="flex flex-wrap items-center gap-2">
                {PAYMENT_ICONS.map((icon) => (
                  <div
                    key={icon.alt}
                    className="bg-white/10 rounded-md p-1.5 hover:bg-white/15 transition-colors"
                    title={icon.alt}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={52}
                      height={26}
                      className="h-5 w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright + Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-gray-500">
              <p>
                © {new Date().getFullYear()} Robustponds®. Todos os direitos
                reservados.
              </p>
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-gray-700">|</span>
                <button
                  onClick={() => navigate('termos')}
                  className="hover:text-gray-300 transition-colors"
                >
                  Termos e Condições
                </button>
                <span className="text-gray-700">|</span>
                <button
                  onClick={() => navigate('privacidade')}
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacidade
                </button>
                <span className="text-gray-700">|</span>
                <button
                  onClick={() => navigate('cookies')}
                  className="hover:text-gray-300 transition-colors"
                >
                  Cookies
                </button>
              </div>
            </div>

            {/* Payment badges in bottom bar */}
            <div className="flex items-center gap-2">
              {PAYMENT_ICONS.map((icon) => (
                <Image
                  key={icon.alt}
                  src={icon.src}
                  alt={icon.alt}
                  width={40}
                  height={20}
                  className="h-4 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
