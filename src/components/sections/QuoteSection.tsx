'use client';

import { FileText } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';

const BRAND_RED = '#C52023';

export default function QuoteSection() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="py-16 md:py-20 bg-[#ECECEC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              ORÇAMENTO GRATUÍTO
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
              Peça já o seu orçamento sem compromisso. A nossa equipa
              especializada vai analisar as suas necessidades e apresentar uma
              solução à medida para o seu projeto.
            </p>
          </div>

          {/* CTA button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('orcamento')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: BRAND_RED }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#a01a1d')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_RED)
              }
            >
              <FileText className="size-5" />
              <span>Solicitar Orçamento</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
