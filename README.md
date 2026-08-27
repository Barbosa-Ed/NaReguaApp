# NaReguaApp

Aplicativo centralizado de agendamento de barbearias

# Visão Geral do Projeto

Plataforma baseada em geolocalização para busca e agendamento de serviços em barbearias e estética.

---

## Personas / Tipos de Usuário

- **Cliente**: Busca estabelecimentos próximos, visualiza perfis/serviços e realiza agendamentos.
- **Gerente/Dono da Barbearia**: Administra os dados do estabelecimento, serviços oferecidos e valores.
- **Profissional**: Gerencia sua própria agenda e horários de atendimento.

---

## Modelo de Barbearias: Credenciadas x Não-Credenciadas

Para resolver o problema de cold start (plataforma vazia sem base inicial de barbearias), o app trabalha com dois tipos de estabelecimento no mapa, visualmente distintos (ícone/cor diferente):

- **Credenciada**: Barbearia que se cadastrou formalmente na plataforma. Possui perfil completo, catálogo de serviços, profissionais e agenda real gerenciada pelo sistema. É a única que aparece com a função de **agendamento** habilitada para o cliente.
- **Não-credenciada**: Barbearia listada apenas como referência de localização, com dados obtidos via *scraping* de fontes públicas (ex.: Google Maps). Exibe somente localização e informações básicas — **sem** opção de agendamento, funcionando como uma camada informativa (similar ao pin de um mapa comum).

**Regras de dados para estabelecimentos não-credenciados:**
- Se o proprietário solicitar remoção do perfil, a remoção deve ser atendida.
- Fluxo de "reivindicação" de perfil (dono de barbearia não-credenciada solicitando credenciamento) ainda **não está definido** — hoje pensado como contato manual (telefone/canal direto da equipe) seguido de envio de link de cadastro. É um ponto em aberto a ser desenhado.

**Aquisição inicial (fase de lançamento):**
- Abordagem direta com barbearias para credenciamento.
- Cadastro aberto (self-service) para novas barbearias é planejado como evolução futura do produto.

---

## Requisitos Funcionais (RF)

**Módulo: Cliente**

- **RF01 - Visualização por Geolocalização**: O sistema deve exibir no mapa as barbearias e serviços de estética próximos ao usuário, diferenciando visualmente estabelecimentos credenciados e não-credenciados.
- **RF02 - Perfil do Estabelecimento**: O sistema deve permitir visualizar detalhes da barbearia, catálogo de serviços e tabela de preços (barbearias credenciadas) ou informações básicas de localização (barbearias não-credenciadas).
- **RF03 - Agendamento**: O cliente deve poder selecionar serviço, profissional, data e horário disponível para agendar, exclusivamente em barbearias credenciadas.
- **RF06 - Confirmação de Presença**: O sistema deve solicitar ao cliente a confirmação de presença 24h antes do horário agendado. Caso o cliente não confirme até 5h antes do horário, o agendamento é automaticamente desfeito e o horário é liberado para novo agendamento por outro cliente.

**Módulo: Barbearia & Profissional**

- **RF04 - Gestão de Serviços**: O gerente deve poder cadastrar, editar e remover serviços e valores.
- **RF05 - Gestão de Agenda**: O profissional deve poder criar horários de atendimento disponíveis, e visualizar e bloquear horários em sua agenda.
- **RF07 - Cancelamento de Agendamento**: O barbeiro, o admin da barbearia ou o próprio cliente que realizou o agendamento podem cancelar um horário já travado. Em caso de cancelamento feito pelo barbeiro ou pelo admin, o cliente deve ser notificado.

---

## Regras de Negócio: Ciclo de Vida do Agendamento

1. A barbearia (profissional/admin) cria os horários de atendimento disponíveis.
2. O cliente escolhe um horário disponível; o horário fica **travado** imediatamente para esse cliente, sem necessidade de confirmação/pagamento no momento da escolha.
3. O horário só é liberado novamente se:
   - o próprio cliente cancelar;
   - o barbeiro ou o admin da barbearia cancelar (com notificação obrigatória ao cliente); ou
   - o cliente não confirmar presença dentro do prazo (ver RF06).
4. Não há reserva de tolerância adicional após o prazo de confirmação expirar: o horário é liberado imediatamente para outro cliente, mesmo que reste pouco tempo até o atendimento.

---

## Requisitos Não Funcionais (RNF)

- **RNF01 - Desempenho**: O carregamento dos dados de geolocalização e renderização do mapa deve ser rápido e responsivo.
- **RNF02 - Segurança**: Proteção básica e armazenamento seguro dos dados cadastrais dos usuários.
- **RNF03 - Escopo de Pagamento**: O processamento de pagamentos está fora do escopo desta versão inicial.
- **RNF04 - Dados de Terceiros (Scraping)**: Estabelecimentos não-credenciados exibidos via dados públicos devem ter processo de remoção mediante solicitação do proprietário.

---

## Notificações

- **Disparo 1**: Lembrete de confirmação de presença enviado 24h antes do horário agendado.
- **Disparo 2**: Lembrete enviado exatamente 1 hora antes do horário agendado (para agendamentos confirmados).
- **Disparo 3**: Notificação ao cliente em caso de cancelamento do agendamento pelo barbeiro ou pelo admin.

---

## Fora de Escopo (v1) — Riscos Aceitos

- **No-show**: Não há mecanismo de penalização ou garantia financeira contra o não comparecimento do cliente além da confirmação de presença (RF06). Este é um risco aceito conscientemente para viabilizar o lançamento mais rápido do produto.
- **Pagamento integrado**: Ver RNF03.

---

## Backlog (Próximas Versões)

- Pagamento integrado à plataforma (com opção de a barbearia usar pagamento próprio do sistema ou manter pagamento externo).
- Confirmação de agendamentos por parte do barbeiro (barbeiro aceita/recusa o agendamento feito pelo cliente).
- Cadastro aberto (self-service) para novas barbearias.
- Fluxo formal de reivindicação de perfil (barbearia não-credenciada → credenciada).