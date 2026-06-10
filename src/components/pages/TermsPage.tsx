'use client';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useNavigationStore } from '@/store/navigation';

const tocItems = [
  { id: 'objeto', label: '1. Objeto' },
  { id: 'precos', label: '2. Preços' },
  { id: 'encomendas', label: '3. Encomendas' },
  { id: 'pagamentos', label: '4. Pagamentos' },
  { id: 'entregas', label: '5. Entregas' },
  { id: 'garantias', label: '6. Garantias' },
  { id: 'devolucoes', label: '7. Devoluções e Cancelamentos' },
  { id: 'propriedade', label: '8. Propriedade Intelectual' },
  { id: 'lei', label: '9. Lei Aplicável' },
  { id: 'disposicoes', label: '10. Disposições Finais' },
];

export function TermsPage() {
  const { navigate } = useNavigationStore();

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
            <BreadcrumbPage>Termos e Condições</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Termos e Condições Gerais</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Última atualização: Janeiro 2025
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Table of Contents */}
        <aside className="w-full shrink-0 lg:w-[220px]">
          <div className="sticky top-24 rounded-lg border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Índice
            </h3>
            <nav className="space-y-1.5">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-8 text-sm leading-relaxed">
          {/* 1. Objeto */}
          <section id="objeto">
            <h2 className="mb-3 text-lg font-bold">1. Objeto</h2>
            <p>
              Os presentes Termos e Condições Gerais regulam a venda de produtos através da loja
              online <strong>robustponds.shop</strong>, propriedade da empresa RobustPonds, com sede
              em Portugal.
            </p>
            <p className="mt-2">
              A utilização da plataforma robustponds.shop implica a aceção integral dos presentes
              termos, que se consideram lidos e aceites pelo utilizador no momento da realização de
              qualquer compra ou utilização dos serviços disponibilizados.
            </p>
          </section>

          <Separator />

          {/* 2. Preços */}
          <section id="precos">
            <h2 className="mb-3 text-lg font-bold">2. Preços</h2>
            <p>
              Todos os preços apresentados na loja online robustponds.shop incluem IVA à taxa legal
              em vigor em Portugal Continental, salvo indicação em contrário.
            </p>
            <p className="mt-2">
              A RobustPonds reserva-se o direito de alterar os preços dos produtos a qualquer momento,
              sem aviso prévio. As alterações de preços não afetam as encomendas já confirmadas e
              pagas.
            </p>
            <p className="mt-2">
              Alguns produtos marcados como &quot;Preço Sob Consulta&quot; destinam-se exclusivamente a
              clientes profissionais (B2B). O preço final é definido caso a caso mediante pedido de
              orçamento, tendo em conta as quantidades e condições específicas.
            </p>
            <p className="mt-2">
              Os preços são apresentados em Euros (EUR). Para clientes internacionais, podem ser
              aplicadas taxas de câmbio e encargos adicionais conforme o método de pagamento
              selecionado.
            </p>
          </section>

          <Separator />

          {/* 3. Encomendas */}
          <section id="encomendas">
            <h2 className="mb-3 text-lg font-bold">3. Encomendas</h2>
            <p>
              A realização de uma encomenda através do site robustponds.shop constitui um contrato
              de compra à distância entre o cliente e a RobustPonds.
            </p>
            <p className="mt-2">
              Após a submissão da encomenda, o cliente receberá uma confirmação por email. A
              encomenda só será considerada efetiva após a confirmação do pagamento pela
              RobustPonds.
            </p>
            <p className="mt-2">
              A RobustPonds reserva-se o direito de recusar ou cancelar encomendas em caso de:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
              <li>Indisponibilidade do produto após confirmação da encomenda;</li>
              <li>Erro na indicação do preço ou descrição do produto;</li>
              <li>Suspeita de fraude ou utilização indevida;</li>
              <li>Incumprimento dos presentes Termos e Condições por parte do cliente.</li>
            </ul>
          </section>

          <Separator />

          {/* 4. Pagamentos */}
          <section id="pagamentos">
            <h2 className="mb-3 text-lg font-bold">4. Pagamentos</h2>
            <p className="mb-4">
              A robustponds.shop aceita os seguintes métodos de pagamento, processados de forma
              segura através da plataforma <strong>Atlas Core</strong> (processador de pagamentos
              certificado PCI DSS):
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">4.1 Cartão de Crédito / Débito</h3>
                <p className="mt-1 text-muted-foreground">
                  Aceitamos Visa, Mastercard e Multibanco. O pagamento é processado de forma segura
                  e encriptada. O cliente será redirecionado para a página segura do processador
                  de pagamentos.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">4.2 Multibanco (Referência de Pagamento)</h3>
                <p className="mt-1 text-muted-foreground">
                  Após a confirmação da encomenda, o cliente receberá uma referência de pagamento
                  Multibanco (Entidade, Referência e Montante) que poderá ser utilizada em qualquer
                  caixa Multibanco ou serviço de homebanking. O pagamento deve ser efetuado no prazo
                  máximo de 5 dias úteis, após o qual a encomenda será automaticamente cancelada.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">4.3 MB WAY</h3>
                <p className="mt-1 text-muted-foreground">
                  O pagamento é realizado através da aplicação MB WAY do cliente. Após a
                  confirmação, o cliente receberá uma notificação na aplicação para confirmar o
                  pagamento. O telemóvel utilizado deve estar previamente associado ao serviço MB WAY.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">4.4 Bizum</h3>
                <p className="mt-1 text-muted-foreground">
                  Bizum é um serviço de pagamentos instantâneos disponível na Espanha. Após a confirmação
                  do pedido, o cliente receberá uma notificação na aplicação Bizum para confirmar o pagamento.
                  O pagamento é instantâneo e seguro.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* 5. Entregas */}
          <section id="entregas">
            <h2 className="mb-3 text-lg font-bold">5. Entregas</h2>
            <p>
              As entregas são efetuadas em Portugal Continental, Regiões Autónomas e internacional,
              conforme as opções disponíveis no momento da compra.
            </p>
            <p className="mt-2">
              Os prazos de entrega indicados são estimativas e contam a partir da confirmação do
              pagamento. Prazo típico:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
              <li>Portugal Continental: 2 a 5 dias úteis;</li>
              <li>Regiões Autónomas: 5 a 10 dias úteis;</li>
              <li>Internacional: 7 a 21 dias úteis (conforme destino).</li>
            </ul>
            <p className="mt-2">
              As despesas de envio são calculadas com base no peso, dimensões e destino da
              encomenda, sendo apresentadas antes da finalização da compra.
            </p>
            <p className="mt-2">
              A RobustPonds não se responsabiliza por atrasos devidos a causas de força maior ou
              circunstâncias fora do seu controlo (greves, condições meteorológicas adversas,
              restrições alfandegárias, etc.).
            </p>
          </section>

          <Separator />

          {/* 6. Garantias */}
          <section id="garantias">
            <h2 className="mb-3 text-lg font-bold">6. Garantias</h2>
            <p>
              Todos os produtos vendidos pela robustponds.shop beneficiam da garantia legal de
              conformidade prevista no Código do Consumo português e na legislação europeia
              aplicável.
            </p>
            <p className="mt-2">
              A garantia legal de conformidade é de 2 anos para bens de consumo e 5 anos para
              componentes e materiais (bomba, motor, etc.), contados a partir da data da entrega.
            </p>
            <p className="mt-2">
              Para exercer o direito de garantia, o cliente deverá contactar o serviço de apoio ao
              cliente através do email <strong>info@robustponds.shop</strong> ou telefone{' '}
              <strong>+351 261 963 343</strong>, indicando o número de encomenda e o defeito
              identificado.
            </p>
            <p className="mt-2">
              A garantia não cobre danos causados por uso indevido, instalação incorreta, falta de
              manutenção, modificações não autorizadas ou desgaste normal.
            </p>
          </section>

          <Separator />

          {/* 7. Devoluções */}
          <section id="devolucoes">
            <h2 className="mb-3 text-lg font-bold">7. Devoluções e Cancelamentos</h2>
            <p>
              O cliente pode exercer o direito de arrependimento num prazo de <strong>14 dias
              corridos</strong> a contar da data de receção dos produtos, nos termos do Decreto-Lei
              nº 24/2014 e do regime geral do consumo à distância.
            </p>
            <p className="mt-2">
              Para efetuar a devolução, o cliente deverá:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
              <li>Contactar o serviço de apoio para obter autorização de devolução;</li>
              <li>Enviar os produtos na embalagem original, sem sinais de uso;</li>
              <li>Incluir cópia da fatura e número de encomenda;</li>
              <li>A suportar as despesas de envio da devolução.</li>
            </ul>
            <p className="mt-2">
              Exceções ao direito de arrependimento: produtos feitos por medida ou personalizados,
              selados por motivos de proteção de saúde ou higiene abertos após a entrega, e
              equipamentos instalados.
            </p>
            <p className="mt-2">
              O reembolso será efetuado no prazo de 14 dias após a receção dos produtos devolvidos
              em bom estado, utilizando o mesmo método de pagamento utilizado na compra.
            </p>
          </section>

          <Separator />

          {/* 8. Propriedade Intelectual */}
          <section id="propriedade">
            <h2 className="mb-3 text-lg font-bold">8. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos do site robustponds.shop, incluindo textos, imagens, logótipos,
              marcas, design, software e demais materiais, são propriedade da RobustPonds ou dos
              seus respetivos titulares, estando protegidos pela legislação portuguesa e europeia
              sobre direitos de autor e propriedade intelectual.
            </p>
            <p className="mt-2">
              É expressamente proibida a reprodução, distribuição, modificação ou utilização
              comercial de qualquer conteúdo sem autorização prévia e escrita da RobustPonds.
            </p>
            <p className="mt-2">
              O nome &quot;robustponds.shop&quot;, o respetivo logótipo e todas as marcas comerciais
              associadas são propriedade exclusiva da RobustPonds.
            </p>
          </section>

          <Separator />

          {/* 9. Lei Aplicável */}
          <section id="lei">
            <h2 className="mb-3 text-lg font-bold">9. Lei Aplicável e Foro Competente</h2>
            <p>
              Os presentes Termos e Condições são regidos pela legislação portuguesa, sem prejuízo
              das disposições imperativas aplicáveis ao consumidor nos termos da Diretiva
              (UE) 2017/2394, do Regulamento (UE) 2018/302 e da legislação europeia de defesa
              do consumidor.
            </p>
            <p className="mt-2">
              Para a resolução de litígios será competente o Centro de Arbitragem de Conflitos de
              Consumo de Lisboa, sem prejuízo do recurso aos tribunais judiciais competentes, nos
              termos da lei portuguesa.
            </p>
            <p className="mt-2">
              O cliente pode apresentar as suas reclamações através da plataforma europeia de
              resolução de litígios em linha disponível em:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <Separator />

          {/* 10. Disposições Finais */}
          <section id="disposicoes">
            <h2 className="mb-3 text-lg font-bold">10. Disposições Finais</h2>
            <p>
              A RobustPonds reserva-se o direito de alterar os presentes Termos e Condições a
              qualquer momento, sendo as alterações aplicáveis a novas encomendas a partir da
              data da sua publicação no site.
            </p>
            <p className="mt-2">
              Se qualquer cláusula dos presentes termos for considerada nula ou inaplicável, as
              restantes cláusulas permanecerão em pleno vigor e efeito.
            </p>
            <p className="mt-2">
              O facto de a RobustPonds não exercer um direito previsto nestes termos não constitui
              renúncia ao mesmo.
            </p>
            <p className="mt-2">
              Para qualquer esclarecimento adicional, contacte-nos através do email{' '}
              <a href="mailto:info@robustponds.shop" className="text-primary hover:underline">
                info@robustponds.shop
              </a>{' '}
              ou telefone <a href="tel:+351261963343" className="text-primary hover:underline">+351 261 963 343</a>.
            </p>
          </section>

          <Separator />

          <p className="text-xs text-muted-foreground">
            RobustPonds — robustponds.shop — Todos os direitos reservados.
          </p>
        </main>
      </div>
    </div>
  );
}
