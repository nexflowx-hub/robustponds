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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigationStore } from '@/store/navigation';

export function CookiesPage() {
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
            <BreadcrumbPage>Política de Cookies</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Política de Cookies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Última atualização: Janeiro 2025
        </p>
      </div>

      <main className="flex-1 max-w-3xl space-y-8 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <h2 className="mb-3 text-lg font-bold">O que são Cookies?</h2>
          <p>
            Os cookies são pequenos ficheiros de texto que são guardados no seu dispositivo
            (computador, tablet ou telemóvel) quando visita um website. Permitem que o site
            reconheça o seu dispositivo e armazene informações sobre as suas preferências ou
            ações anteriores.
          </p>
          <p className="mt-2">
            O site <strong>robustponds.shop</strong> utiliza cookies para melhorar a experiência
            do utilizador, garantir o funcionamento correto do site e recolher informações
            analíticas.
          </p>
        </section>

        <Separator />

        {/* Categorias */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Categorias de Cookies</h2>

          <div className="space-y-6">
            {/* Essential */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-green-600 text-white">Essenciais</Badge>
                <h3 className="font-semibold">Cookies Essenciais</h3>
              </div>
              <p className="text-muted-foreground">
                Estes cookies são estritamente necessários para o funcionamento do site e não
                podem ser desativados. São geralmente definidos em resposta a ações suas, como
                definir preferências de privacidade, fazer login ou preencher formulários.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Cookie</th>
                      <th className="pb-2 text-left font-medium">Duração</th>
                      <th className="pb-2 text-left font-medium">Finalidade</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">cookie_consent</td>
                      <td className="py-2">1 ano</td>
                      <td className="py-2">Armazena a sua preferência de consentimento de cookies</td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">session_id</td>
                      <td className="py-2">Sessão</td>
                      <td className="py-2">Identifica a sessão do utilizador no site</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">cart_token</td>
                      <td className="py-2">30 dias</td>
                      <td className="py-2">Mantém os itens do carrinho entre visitas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytical */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-amber-500 text-white">Analíticos</Badge>
                <h3 className="font-semibold">Cookies Analíticos</h3>
              </div>
              <p className="text-muted-foreground">
                Estes cookies permitem-nos contar visitas e fontes de tráfego para podermos medir
                e melhorar o desempenho do nosso site. A informação recolhida por estes cookies é
                agregada e, por conseguinte, anónima.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Cookie</th>
                      <th className="pb-2 text-left font-medium">Duração</th>
                      <th className="pb-2 text-left font-medium">Finalidade</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">_ga</td>
                      <td className="py-2">2 anos</td>
                      <td className="py-2">Distingue utilizadores únicos (Google Analytics)</td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">_ga_*</td>
                      <td className="py-2">2 anos</td>
                      <td className="py-2">Mantém o estado da sessão (Google Analytics 4)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">_gid</td>
                      <td className="py-2">24 horas</td>
                      <td className="py-2">Distingue utilizadores na mesma página (Google Analytics)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Marketing */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-purple-600 text-white">Marketing</Badge>
                <h3 className="font-semibold">Cookies de Marketing</h3>
              </div>
              <p className="text-muted-foreground">
                Estes cookies podem ser definidos através do nosso site pelos nossos parceiros
                publicitários. Podem ser utilizados por essas empresas para criar um perfil dos
                seus interesses e mostrar-lhe anúncios relevantes noutros sites.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Cookie</th>
                      <th className="pb-2 text-left font-medium">Duração</th>
                      <th className="pb-2 text-left font-medium">Finalidade</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">_fbp</td>
                      <td className="py-2">3 meses</td>
                      <td className="py-2">Pixel do Facebook — rastreamento de conversões</td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-2 font-mono">_gcl_au</td>
                      <td className="py-2">3 meses</td>
                      <td className="py-2">Google Ads — rastreamento de conversões</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">NID</td>
                      <td className="py-2">6 meses</td>
                      <td className="py-2">Google — armazena preferências de anúncios</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Third-Party Cookies Table */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Cookies de Terceiros</h2>
          <p className="mb-4">
            O nosso site pode conter cookies de terceiros. Estes cookies estão sujeitos às
            políticas de privacidade dos respetivos terceiros:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Terceiro</th>
                  <th className="pb-2 text-left font-medium">Finalidade</th>
                  <th className="pb-2 text-left font-medium">Política de Privacidade</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-dashed">
                  <td className="py-2 font-medium text-foreground">Google Analytics</td>
                  <td className="py-2">Análise de tráfego e comportamento</td>
                  <td className="py-2">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Privacy
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-2 font-medium text-foreground">Google Ads</td>
                  <td className="py-2">Rastreamento de conversões e remarketing</td>
                  <td className="py-2">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Privacy
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-dashed">
                  <td className="py-2 font-medium text-foreground">Meta (Facebook)</td>
                  <td className="py-2">Pixel de conversão e remarketing</td>
                  <td className="py-2">
                    <a
                      href="https://www.facebook.com/privacy/policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Meta Privacy
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Atlas Core</td>
                  <td className="py-2">Processamento seguro de pagamentos (PCI DSS)</td>
                  <td className="py-2">
                    <a
                      href="#"
                      className="text-primary hover:underline"
                    >
                      Atlas Core Privacy
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator />

        {/* How to Manage Cookies */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Como Gerir os Cookies</h2>
          <p>
            Pode gerir e eliminar cookies através das definições do seu navegador. Note que a
            desativação de certos cookies pode afetar a funcionalidade do site.
          </p>

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Instruções por Navegador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Google Chrome</p>
                <p className="text-muted-foreground">
                  Configurações → Privacidade e segurança → Cookies e outros dados dos sites → Gerir e eliminar cookies
                </p>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ajuda do Chrome →
                </a>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Mozilla Firefox</p>
                <p className="text-muted-foreground">
                  Definições → Privacidade e segurança → Cookies e dados do site
                </p>
                <a
                  href="https://support.mozilla.org/pt-BR/kb/gerenciar-configuracao-cookies-sites-firefox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ajuda do Firefox →
                </a>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Safari (macOS)</p>
                <p className="text-muted-foreground">
                  Preferências → Privacidade → Gerir dados dos sites
                </p>
                <a
                  href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ajuda do Safari →
                </a>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Microsoft Edge</p>
                <p className="text-muted-foreground">
                  Definições → Cookies e permissões do site → Gerir e eliminar cookies
                </p>
                <a
                  href="https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ajuda do Edge →
                </a>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Safari (iOS / iPhone)</p>
                <p className="text-muted-foreground">
                  Definições → Safari → Bloquear e permitir cookies
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Chrome (Android)</p>
                <p className="text-muted-foreground">
                  Definições → Configurações do site → Cookies
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* More info */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Mais Informações</h2>
          <p>
            Para mais informações sobre a utilização dos seus dados pessoais, consulte a nossa{' '}
            <span className="font-medium text-primary cursor-pointer">
              Política de Privacidade
            </span>
            .
          </p>
          <p className="mt-2">
            Para questões sobre cookies ou sobre a proteção dos seus dados pessoais, contacte-nos:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
            <li>
              Email:{' '}
              <a href="mailto:info@robustponds.shop" className="text-primary hover:underline">
                info@robustponds.shop
              </a>
            </li>
            <li>
              Telefone:{' '}
              <a href="tel:+351261963343" className="text-primary hover:underline">
                +351 261 963 343
              </a>
            </li>
          </ul>
        </section>

        <Separator />

        <p className="text-xs text-muted-foreground">
          RobustPonds — robustponds.shop — Todos os direitos reservados.
        </p>
      </main>
    </div>
  );
}
