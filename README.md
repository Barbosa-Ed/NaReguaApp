# NaReguaApp
Aplicativo centralizado de agendamento de barbearias 

# Visão Geral do Projeto
Plataforma baseada em geolocalização para busca e agendamento de serviços em barbearias e estética.

---

# Personas / Tipos de Usuário
* **Cliente**: Busca estabelecimentos próximos, visualiza perfis/serviços e realiza agendamentos.
* **Gerente/Dono da Barbearia**: Administra os dados do estabelecimento, serviços oferecidos e valores.
* **Profissional**: Gerencia sua própria agenda e horários de atendimento.

---

# Requisitos Funcionais (RF)

**Módulo: Cliente**
* **RF01 - Visualização por Geolocalização**: O sistema deve exibir no mapa as barbearias e serviços de estética próximos ao usuário.
* **RF02 - Perfil do Estabelecimento**: O sistema deve permitir visualizar detalhes da barbearia, catálogo de serviços e tabela de preços.
* **RF03 - Agendamento**: O cliente deve poder selecionar serviço, profissional, data e horário disponível para agendar.

**Módulo: Barbearia & Profissional**
* **RF04 - Gestão de Serviços**: O gerente deve poder cadastrar, editar e remover serviços e valores.
* **RF05 - Gestão de Agenda**: O profissional deve poder visualizar e bloquear horários em sua agenda.

---

# Requisitos Não Funcionais (RNF)
* **RNF01 - Desempenho**: O carregamento dos dados de geolocalização e renderização do mapa deve ser rápido e responsivo.
* **RNF02 - Segurança**: Proteção básica e armazenamento seguro dos dados cadastrais dos usuários.
* **RNF03 - Escopo de Pagamento**: O processamento de pagamentos está fora do escopo desta versão inicial.

---

# Notificações
* **Disparo 1**: Notificação enviada no início do dia marcado para o atendimento.
* **Disparo 2**: Lembrete enviado exatamente 1 hora antes do horário agendado.