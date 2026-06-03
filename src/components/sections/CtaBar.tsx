'use client';

import { Ruler, BookOpen, Calculator } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';

const CTA_ITEMS = [
  {
    icon: Ruler,
    label: 'Soluções à medida',
    description: 'Configuradas para cada projeto',
  },
  {
    icon: BookOpen,
    label: 'Ver Catálogos',
    description: 'Consulte os nossos catálogos',
  },
  {
    icon: Calculator,
    label: 'Orçamentos Grátis',
    description: 'Peça o seu orçamento sem compromisso',
    page: 'orcamento' as const,
  },
];

export default function CtaBar() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="w-full bg-[#BE312C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/30">
          {CTA_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => item.page && navigate(item.page)}
              className={`flex flex-col items-center gap-2 py-5 px-6 text-center group transition-colors ${
                item.page
                  ? 'hover:bg-white/10 cursor-pointer'
                  : 'cursor-default'
              }`}
            >
              <item.icon className="size-6 text-[#333]" />
              <span className="text-sm sm:text-base font-bold text-[#333]">
                {item.label}
              </span>
              <span className="text-xs text-[#333]/70 hidden sm:block">
                {item.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
