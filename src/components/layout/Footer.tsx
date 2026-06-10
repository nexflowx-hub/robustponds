'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';
import { CATEGORIES } from '@/types';

const BRAND_RED = '#C52023';

const INFO_LINKS = [
  { label: 'Contactos', page: 'contactos' as const },
  { label: 'Pedir Orçamento', page: 'orcamento' as const },
  { label: 'Termos e Condições', page: 'termos' as const },
  { label: 'Política de Privacidade', page: 'privacidade' as const },
  { label: 'Política de Cookies', page: 'cookies' as const },
];

export default function Footer() {
  const navigate = useNavigationStore((s) => s.navigate);

  const handleCategoryClick = (category: string) => {
    navigate('produtos', category);
  };

  return (
    <footer className="bg-[#2C2C2C] text-white">
      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: ROBUSTPONDS® */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo-robustponds.png"
              alt="Robustponds® - Equipamentos Frigoríficos Industriais"
              width={160}
              height={74}
              className="h-14 w-auto mb-4 brightness-0 invert"
              priority
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Especialistas em equipamentos frigoríficos industriais e
              comercialização de produtos para câmaras frias, portas
              frigoríficas, painéis isotérmicos e muito mais.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+351261963343"
                className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <Phone className="size-4 flex-shrink-0 text-[#C52023] group-hover:scale-110 transition-transform" />
                <span>+351 261 963 343</span>
              </a>
              <a
                href="mailto:orcamentos@robustponds.pt"
                className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <Mail className="size-4 flex-shrink-0 text-[#C52023] group-hover:scale-110 transition-transform" />
                <span>orcamentos@robustponds.pt</span>
              </a>
            </div>
          </div>

          {/* Col 2: PRODUTOS */}
          <div>
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

          {/* Col 3: INFORMAÇÃO */}
          <div>
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
          </div>

          {/* Col 4: LOCALIZAÇÃO + Livro de Reclamações */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-200">
              Localização
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-gray-400 mb-4">
              <MapPin className="size-4 flex-shrink-0 text-[#C52023] mt-0.5" />
              <span>
                Zona Industrial, Apartado 123
                <br />
                2560-000 Torres Vedras, Portugal
              </span>
            </div>

            {/* Livro de Reclamações */}
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-4 group"
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded text-white text-xs font-bold"
                style={{ backgroundColor: BRAND_RED }}
                aria-label="Livro de Reclamações"
              >
                LR
              </span>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Livro de Reclamações
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} Robustponds®. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-4">
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
        </div>
      </div>
    </footer>
  );
}
