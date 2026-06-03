'use client';

import {
  DoorOpen,
  Puzzle,
  Rows3,
  LayoutGrid,
  Shield,
  Sparkles,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';

const BRAND_RED = '#C52023';

const CATEGORY_CARDS = [
  {
    icon: DoorOpen,
    name: 'Portas',
    description: 'Portas frigoríficas deslizantes, pivotantes e rápidas para câmaras frias.',
    color: '#C52023',
    slug: 'portas',
  },
  {
    icon: Puzzle,
    name: 'Complementos',
    description: 'Acessórios e complementos essenciais para câmaras frias.',
    color: '#2E86AB',
    slug: 'complementos',
  },
  {
    icon: Rows3,
    name: 'Cortina de Lamelas',
    description: 'Isolamento térmico com cortinas de lamelas de PVC.',
    color: '#F18F01',
    slug: 'cortina-de-lamelas',
  },
  {
    icon: LayoutGrid,
    name: 'Painel',
    description: 'Painéis isotérmicos para construção de câmaras frias.',
    color: '#3A7D44',
    slug: 'painel',
  },
  {
    icon: Shield,
    name: 'Proteção',
    description: 'Guarda-rail e cantoneiras para proteção industrial.',
    color: '#7B2D8B',
    slug: 'protecao',
  },
  {
    icon: Sparkles,
    name: 'Revestimentos Higiénicos',
    description: 'Revestimentos higiénicos para paredes e tetos.',
    color: '#0077B6',
    slug: 'revestimentos-higienicos',
  },
];

export default function ProductsPreview() {
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            OS NOSSOS PRODUTOS
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: BRAND_RED }}
          />
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.slug}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${card.color}12` }}
              >
                <card.icon
                  className="size-7"
                  style={{ color: card.color }}
                />
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {card.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {card.description}
              </p>

              {/* Link */}
              <button
                onClick={() => navigate('produtos-categoria', card.slug)}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: BRAND_RED }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#a01a1d')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = BRAND_RED)
                }
              >
                <Plus className="size-4" />
                <span>Ver mais</span>
              </button>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="text-center mt-10 md:mt-14">
          <button
            onClick={() => navigate('produtos')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND_RED }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a01a1d')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_RED)}
          >
            <span>Veja Aqui!</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
