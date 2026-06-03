'use client';

import { Award, Ruler, Wrench, Clock } from 'lucide-react';

const BRAND_RED = '#C52023';

const FEATURES = [
  {
    icon: Award,
    title: 'Qualidade Superior',
    description:
      'Produtos certificados e testados para garantir a máxima durabilidade e desempenho.',
  },
  {
    icon: Ruler,
    title: 'Soluções à Medida',
    description:
      'Configuramos cada solução de acordo com as necessidades específicas do seu projeto.',
  },
  {
    icon: Wrench,
    title: 'Assistência Técnica',
    description:
      'Equipa técnica especializada pronta para apoiar na instalação e manutenção.',
  },
  {
    icon: Clock,
    title: 'Experiência Comprovada',
    description:
      'Décadas de experiência no mercado de refrigeração e equipamentos industriais.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            SOBRE A ROBUSTPONDS<span style={{ color: BRAND_RED }}>®</span>
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: BRAND_RED }}
          />
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
            A Robustponds® é uma empresa líder no sector de equipamentos
            frigoríficos, oferecendo soluções completas para câmaras frias,
            portas frigoríficas, painéis isotérmicos e muito mais.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 md:p-8 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: 'rgba(197, 32, 35, 0.08)' }}
              >
                <feature.icon className="size-8" style={{ color: BRAND_RED }} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
