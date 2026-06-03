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
import { Card, CardContent } from '@/components/ui/card';
import { useNavigationStore } from '@/store/navigation';

export function PrivacyPage() {
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
            <BreadcrumbPage>Política de Privacidade</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Política de Privacidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Em conformidade com o Regulamento Geral de Proteção de Dados (RGPD) — Regulamento (UE) 2016/679
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Última atualização: Janeiro 2025
        </p>
      </div>

      <main className="flex-1 max-w-3xl space-y-8 text-sm leading-relaxed">
        {/* 1. Responsável */}
        <section>
          <h2 className="mb-3 text-lg font-bold">1. Responsável pelo Tratamento de Dados</h2>
          <p>
            O responsável pelo tratamento dos dados pessoais recolhidos através do site{' '}
            <strong>robustponds.shop</strong> é:
          </p>
          <Card className="mt-3">
            <CardContent className="p-4 space-y-1">
              <p className="font-semibold">RobustPonds</p>
              <p className="text-muted-foreground">Sede: Portugal</p>
              <p className="text-muted-foreground">
                Email:{' '}
                <a href="mailto:info@robustponds.shop" className="text-primary hover:underline">
                  info@robustponds.shop
                </a>
              </p>
              <p className="text-muted-foreground">
                Telefone:{' '}
                <a href="tel:+351261963343" className="text-primary hover:underline">
                  +351 261 963 343
                </a>
              </p>
            </CardContent>
          </Card>
          <p className="mt-3">
            Para questões relacionadas com a proteção dos seus dados pessoais, pode contactar-nos
            através dos contactos acima indicados ou através da Comissão Nacional de Proteção de
            Dados (CNPD).
          </p>
        </section>

        <Separator />

        {/* 2. Dados */}
        <section>
          <h2 className="mb-3 text-lg font-bold">2. Dados Pessoais Recolhidos</h2>
          <p>
            A RobustPonds recolhe e trata os seguintes dados pessoais dos utilizadores e clientes:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li><strong>Dados de identificação:</strong> Nome completo, NIF (quando fornecido), data de nascimento (apenas para pagamentos com criptomoedas, conforme requisitos KYC/AML);</li>
            <li><strong>Dados de contacto:</strong> Email, número de telefone, morada (quando fornecida);</li>
            <li><strong>Dados de transação:</strong> Histórico de compras, produtos adquiridos, dados de pagamento (processados de forma segura pela plataforma Atlas Core);</li>
            <li><strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, sistema operativo, páginas visitadas (através de cookies, conforme a nossa Política de Cookies);</li>
            <li><strong>Dados de comunicação:</strong> Mensagens enviadas através dos formulários de contacto e orçamento.</li>
          </ul>
          <p className="mt-2">
            Os dados de pagamento (número de cartão, etc.) são processados diretamente pela{' '}
            <strong>Atlas Core</strong>, um processador de pagamentos certificado{' '}
            <strong>PCI DSS</strong> (Payment Card Industry Data Security Standard). A RobustPonds
            não tem acesso nem armazena dados completos de cartões de crédito ou débito.
          </p>
        </section>

        <Separator />

        {/* 3. Finalidade */}
        <section>
          <h2 className="mb-3 text-lg font-bold">3. Finalidade do Tratamento</h2>
          <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li>Gestão de encomendas e entrega de produtos;</li>
            <li>Processamento de pagamentos (em conformidade com os requisitos legais);</li>
            <li>Resposta a pedidos de contacto e orçamento;</li>
            <li>Comunicação sobre o estado das encomendas;</li>
            <li>Envio de newsletters e comunicações de marketing (mediante consentimento prévio);</li>
            <li>Cumprimento de obrigações legais e regulatórias (faturação, contabilidade, KYC/AML);</li>
            <li>Melhoria dos nossos serviços e experiência do utilizador;</li>
            <li>Análise estatística e de mercado (dados anonimizados).</li>
          </ul>
        </section>

        <Separator />

        {/* 4. Base Legal */}
        <section>
          <h2 className="mb-3 text-lg font-bold">4. Base Legal</h2>
          <p>O tratamento dos dados pessoais é efetuado com base nas seguintes bases legais (RGPD, Art.º 6):</p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li><strong>Execução de contrato:</strong> Tratamento necessário para a execução do contrato de compra (Art.º 6.º, n.º 1, alínea b));</li>
            <li><strong>Obrigação legal:</strong> Cumprimento de obrigações legais em matéria fiscal, contabilística e regulatória (Art.º 6.º, n.º 1, alínea c));</li>
            <li><strong>Consentimento:</strong> Tratamento de dados para fins de marketing e newsletters, mediante consentimento expresso do titular (Art.º 6.º, n.º 1, alínea a));</li>
            <li><strong>Interesse legítimo:</strong> Análise de dados para melhoria dos serviços e prevenção de fraude (Art.º 6.º, n.º 1, alínea f)).</li>
          </ul>
        </section>

        <Separator />

        {/* 5. Direitos */}
        <section>
          <h2 className="mb-3 text-lg font-bold">5. Direitos do Titular dos Dados</h2>
          <p>
            Nos termos do RGPD, o titular dos dados pessoais tem os seguintes direitos:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-2 pl-4">
            <li><strong>Direito de acesso:</strong> O direito de obter confirmação e informação sobre os dados pessoais tratados;</li>
            <li><strong>Direito de retificação:</strong> O direito de solicitar a correção de dados inexatos ou incompletos;</li>
            <li><strong>Direito ao apagamento:</strong> O direito à eliminação dos dados pessoais (&quot;direito ao esquecimento&quot;), quando aplicável;</li>
            <li><strong>Direito à limitação:</strong> O direito de restringir o tratamento dos dados em determinadas circunstâncias;</li>
            <li><strong>Direito à portabilidade:</strong> O direito de receber os seus dados num formato estruturado e de uso corrente;</li>
            <li><strong>Direito de oposição:</strong> O direito de se opor ao tratamento dos dados, nomeadamente para fins de marketing direto;</li>
            <li><strong>Direito de retirar o consentimento:</strong> O direito de retirar o consentimento a qualquer momento, sem comprometer a licitude do tratamento anterior;</li>
            <li><strong>Direito de apresentar reclamação:</strong> O direito de apresentar uma reclamação junto da CNPD ou de outra autoridade de controlo competente.</li>
          </ul>
          <p className="mt-3">
            Para exercer qualquer destes direitos, contacte-nos através do email{' '}
            <a href="mailto:info@robustponds.shop" className="text-primary hover:underline">
              info@robustponds.shop
            </a>{' '}
            indicando o seu pedido. Responderemos no prazo máximo de 30 dias.
          </p>
        </section>

        <Separator />

        {/* 6. Partilha e Transferência */}
        <section>
          <h2 className="mb-3 text-lg font-bold">6. Partilha e Transferência de Dados</h2>
          <p>
            Os seus dados pessoais podem ser partilhados com:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li><strong>Atlas Core:</strong> Processador de pagamentos certificado PCI DSS, para o processamento seguro das transações;</li>
            <li><strong>Operadores logísticos:</strong> Empresas de transporte para a entrega das encomendas;</li>
            <li><strong>Autoridades competentes:</strong> Quando exigido por lei ou por ordem judicial.</li>
          </ul>
          <p className="mt-2">
            Todos os subcontratantes cumprem requisitos adequados de proteção de dados. Não
            efetuamos transferências internacionais de dados para países fora do Espaço Económico
            Europeu sem as devidas garantias.
          </p>
        </section>

        <Separator />

        {/* 7. Retenção */}
        <section>
          <h2 className="mb-3 text-lg font-bold">7. Período de Retenção dos Dados</h2>
          <p>
            Os dados pessoais são mantidos apenas durante o período necessário para as finalidades
            para as quais foram recolhidos:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li><strong>Dados de clientes:</strong> Mantidos durante a relação contratual e durante o período legal de 10 anos para fins de contabilidade e fiscalidade;</li>
            <li><strong>Dados de contactos/orçamentos:</strong> Mantidos durante 2 anos após o último contacto;</li>
            <li><strong>Dados de marketing:</strong> Mantidos até retirada do consentimento;</li>
            <li><strong>Dados técnicos (logs):</strong> Mantidos durante 90 dias.</li>
          </ul>
        </section>

        <Separator />

        {/* 8. Cookies */}
        <section>
          <h2 className="mb-3 text-lg font-bold">8. Cookies</h2>
          <p>
            O site robustponds.shop utiliza cookies para melhorar a experiência do utilizador.
            Para mais informações sobre a utilização de cookies, consulte a nossa{' '}
            <span className="font-medium text-primary cursor-pointer">
              Política de Cookies
            </span>.
          </p>
        </section>

        <Separator />

        {/* 9. Segurança */}
        <section>
          <h2 className="mb-3 text-lg font-bold">9. Segurança dos Dados</h2>
          <p>
            A RobustPonds implementa medidas técnicas e organizativas adequadas para proteger os
            dados pessoais contra acesso não autorizado, perda, destruição ou alteração. Estas
            medidas incluem:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li>Encriptação SSL/TLS para todas as comunicações;</li>
            <li>Processamento de pagamentos seguro via Atlas Core (certificação PCI DSS);</li>
            <li>Controlo de acesso restrito aos dados pessoais;</li>
            <li>Monitorização e auditorias regulares de segurança;</li>
            <li>Plano de resposta a incidentes de segurança.</li>
          </ul>
        </section>

        <Separator />

        {/* 10. CNPD */}
        <section>
          <h2 className="mb-3 text-lg font-bold">10. Contacto — CNPD</h2>
          <p>
            Caso considere que o tratamento dos seus dados pessoais viola o RGPD, tem o direito
            de apresentar uma reclamação junto da:
          </p>
          <Card className="mt-3">
            <CardContent className="p-4 space-y-1">
              <p className="font-semibold">Comissão Nacional de Proteção de Dados (CNPD)</p>
              <p className="text-muted-foreground">Website:{' '}
                <a
                  href="https://www.cnpd.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.cnpd.pt
                </a>
              </p>
              <p className="text-muted-foreground">Email: cnpd@cnpd.pt</p>
              <p className="text-muted-foreground">Telefone: +351 21 391 15 50</p>
              <p className="text-muted-foreground">Morada: Av. D. Carlos I, 126, 1249-074 Lisboa</p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <p className="text-xs text-muted-foreground">
          RobustPonds — robustponds.shop — Todos os direitos reservados.
        </p>
      </main>
    </div>
  );
}
