# Arquitetura e Estrutura do NaReguaApp

Documento de visão arquitetural e organização do repositório do projeto **NaReguaApp**.

---

## 1. Visão Geral da Arquitetura

O **NaReguaApp** é construído como um monorepo com suporte a múltiplos clientes e pacotes compartilhados.

```
NaReguaApp/
├── apps/
│   ├── mobile/              # Aplicação React Native (Expo) - Cliente e Barbeiro
│   └── web/                 # (Fase futura) Dashboard Web do Dono da Barbearia
├── packages/
│   └── shared/              # Modelos TypeScript, tipos de domínio e constantes
├── supabase/                # Infraestrutura de Banco de Dados e BaaS
│   └── migrations/          # Scripts SQL DDL com PostGIS e RLS
├── docs/                    # Documentação técnica e de negócio
│   └── architecture.md
├── package.json             # Raiz do Monorepo (npm workspaces)
└── README.md                # Visão de produto e requisitos
```

---

## 2. Decisões Técnicas

### 2.1 Frontend Mobile (`apps/mobile`)
- **Framework**: [Expo](https://expo.dev) (React Native + TypeScript).
- **Gerenciador de Estado / Data Fetching**: TanStack Query (React Query) para cache e sincronização otimista de agendamentos.
- **Geolocalização & Mapas**: `expo-location` para captura precisa de GPS e `react-native-maps` para renderização fluida do mapa de barbearias.
- **Estilização**: Tailwind CSS via [NativeWind](https://www.nativewind.dev/) ou StyleSheet modular.

### 2.2 Backend & Banco de Dados (`supabase/`)
- **Banco de Dados**: PostgreSQL com extensão **PostGIS** para cálculo de distâncias geoespaciais em alta performance (`ST_DWithin` com índice GiST).
- **Autenticação**: Supabase Auth (JWT com identificação de papéis: `client`, `barber`, `owner`).
- **Segurança**: Row Level Security (RLS) garantindo isolamento de dados por barbearia e por usuário.
- **Rotinas Agendadas (Ciclo de Vida de 5h)**: Supabase `pg_cron` ou Edge Function agendada executando varreduras a cada 5–10 minutos para cancelamento automático de agendamentos pendentes não confirmados.

### 2.3 Pacote Compartilhado (`packages/shared`)
- Centraliza interfaces de dados (`UserProfile`, `Barbershop`, `BarbershopService`, `Appointment`), enums de status e constantes de negócio (`APPOINTMENT_RULES`).
- Evita divergências entre app mobile, web e eventuais funções serverless.

---

## 3. Modelo de Barbearias (Self-Service Gratuito)

- Qualquer barbearia pode se cadastrar gratuitamente fornecendo seus dados básicos e localização no mapa.
- Não há camada de scraping ou estabelecimentos não-credenciados.
- Todas as barbearias exibidas no mapa estão aptas a receber agendamentos.

---

## 4. Perfis de Acesso & Avaliações de Barbeiros

### 4.1 Acesso do Cliente (`ClientTabNavigator`)
- **Explorar (`ExploreScreen`)**: Busca por raio geográfico, visualização em lista e radar de mapa, detalhes de serviços e profissionais com notas.
- **Meus Agendamentos (`AppointmentsScreen`)**: Gestão de horários travados, confirmação de presença (regra 24h/5h), cancelamento e **botão para avaliar o barbeiro** após o atendimento ser concluído.
- **Perfil (`ProfileScreen`)**: Dados da conta e alternador de perfil.

### 4.2 Acesso do Dono da Barbearia (`OwnerTabNavigator`)
- **Agenda do Dia (`OwnerAgendaScreen`)**: Visualização em tempo real dos agendamentos de hoje, horários livres, filtros por status e conclusão de atendimentos.
- **Catálogo de Serviços (`OwnerServicesScreen`)**: Interface para criar, editar valores, alterar durações e ativar/pausar serviços.
- **Minha Barbearia (`OwnerBarbershopScreen`)**: Dados cadastrais, controle de abertura no mapa e visualização da equipe de barbeiros com suas notas médias e avaliações recebidas dos clientes.

### 4.3 Sistema de Avaliação de Barbeiros
- Avaliações de 1 a 5 estrelas com comentários opcionais.
- Vinculadas ao agendamento concluído (`appointment_id`), garantindo que apenas clientes que realmente foram atendidos possam avaliar.
- Armazenadas na tabela `public.professional_reviews` com índices em `professional_id` e `barbershop_id`.


