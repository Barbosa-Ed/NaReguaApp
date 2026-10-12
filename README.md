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

## Modelo de Barbearias: Cadastro Gratuito (Self-Service)

Todas as barbearias exibidas na plataforma são estabelecimentos reais e cadastrados voluntariamente de forma gratuita:

- **Cadastro Gratuito e Aberto**: Qualquer barbearia ou profissional autônomo pode se cadastrar diretamente pelo aplicativo/plataforma sem custo.
- **Perfil Completo**: Cada barbearia possui dados do estabelecimento, localização (geolocalização), catálogo de serviços com preços, profissionais e gestão de agenda.
- **Agendamento Habilitado**: Todas as barbearias visíveis no mapa possuem a função de **agendamento** habilitada para os clientes.

---

## Requisitos Funcionais (RF)

**Módulo: Cliente**

- **RF01 - Visualização por Geolocalização**: O sistema deve exibir no mapa as barbearias cadastradas próximas ao usuário, ordenadas por proximidade e com cálculo de distância.
- **RF02 - Perfil do Estabelecimento**: O sistema deve permitir visualizar detalhes da barbearia (nome, endereço, fotos, telefone, horário de funcionamento), catálogo de serviços com tabela de preços e profissionais da equipe.
- **RF03 - Agendamento**: O cliente deve poder selecionar serviço, profissional, data e horário disponível para agendar seu atendimento.
- **RF06 - Confirmação de Presença**: O sistema deve solicitar ao cliente a confirmação de presença 24h antes do horário agendado. Caso o cliente não confirme até 5h antes do horário, o agendamento é automaticamente desfeito e o horário é liberado para novo agendamento por outro cliente.

**Módulo: Barbearia & Profissional**

- **RF00 - Cadastro Gratuito de Barbearia**: O dono/gerente pode se cadastrar gratuitamente, fornecendo dados do estabelecimento, endereço com localização no mapa e telefone.
- **RF04 - Gestão de Serviços**: O gerente deve poder cadastrar, editar e remover serviços, durações em minutos e valores.
- **RF05 - Gestão de Agenda**: O profissional deve poder criar horários de atendimento disponíveis, e visualizar e bloquear horários em sua agenda.
- **RF07 - Cancelamento de Agendamento**: O barbeiro, o admin da barbearia ou o próprio cliente que realizou o agendamento podem cancelar um horário já travado. Em caso de cancelamento feito pelo barbeiro ou pelo admin, o cliente deve ser notificado.
- **RF08 - Avaliação do Barbeiro**: Após a conclusão de um atendimento, o cliente pode avaliar o serviço prestado pelo barbeiro específico com nota (1 a 5 estrelas) e comentário opcional. A média das notas e os comentários são exibidos no perfil do profissional e da barbearia.

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
- Confirmação manual de agendamentos por parte do barbeiro (aceitar/recusar).
- Programa de fidelidade e histórico de cortes com fotos no perfil do cliente.

## Elicitação de Requisitos

### Pontos de interessa

1. Perfil do Negócio
* Como funciona seu trabalho? (barbearia própria, profissional em barbearia de terceiros, aluguel de cadeira, atendimento a domicílio, barbeiro autônomo)
* Quantos profissionais trabalham no estabelecimento?
* Quantos clientes você atende por dia/semana, em média?

>💡 Esse bloco é crucial: um dono de barbearia com 5 barbeiros tem necessidades muito diferentes de um barbeiro que atende a domicílio. Pode valer a pena criar dois roteiros distintos.

2. Processo Atual de Agendamento
* Como os clientes agendam hoje? (telefone, WhatsApp, Instagram, agenda de papel, outro app)
* Se for por aplicativo, qual aplicativo usa?
* E se sente falta de alguma funcionalidade?
* Como é o fluxo do agendamento até o atendimento?
* Quais são os maiores problemas no processo atual?
* Com que frequência clientes faltam sem avisar (no-show)? * O que você faz quando isso acontece?
* Já aconteceu de dois clientes marcarem o mesmo horário? * Como resolveu?
* Como lida com cancelamentos de última hora?

3. Geolocalização e Deslocamento
* Você atende somente no estabelecimento ou também vai até o cliente?
* Se atende a domicílio: qual o raio máximo de deslocamento? 
* Cobra taxa por deslocamento?
* Você acredita que novos clientes te procurariam por proximidade (quem está perto da barbearia)?
* O que faria um cliente escolher uma barbearia próxima em vez de outra?

> 💡 Valide aqui a premissa central do seu sistema: o prestador realmente vê valor em ser encontrado por localização, ou a fidelidade/indicação é mais forte nesse mercado?

4. Agenda e Disponibilidade
* Quais são seus horários de funcionamento? Variam por dia da semana?
* Quanto tempo dura cada tipo de serviço? Existe intervalo entre atendimentos (limpeza, descanso)?
* Aceita encaixes no mesmo dia? E quanto tempo antes o cliente consegue agendar?
* Com quanta antecedência os clientes costumam marcar?
* Como você gerencia horários de almoço, folgas e férias?

5. Serviços e Preços
* Quais serviços você oferece? (liste com duração e preço aproximado)
* Os preços variam por profissional ou são da casa?
* A duração do serviço varia conforme o cliente (ex.: cabelo difícil, barba cheia)?

6. Relacionamento com Clientes
* Você mantém algum histórico dos clientes (corte preferido, fotos, alergias, conversas)?
* Seus clientes têm barbeiro de preferência ou atendem com quem estiver disponível?
* O que você faz para fidelizar clientes?
* Como funciona a recuperação de clientes que sumiram?

7. Comunicação
* Como você confirma que o cliente vai comparecer?
* Lembretes automáticos (WhatsApp, SMS, push) seriam úteis? Por qual canal?
* Você já pede avaliações aos clientes? Onde elas aparecem (Google, Instagram)?
* Como você responderia a uma avaliação negativa pública no app?

8. Gestão de Equipe (se houver mais de um profissional)
* Cada barbeiro controla a própria agenda ou existe uma agenda central?
* Você precisaria controlar a performance de cada profissional?
* Quem teria permissão para alterar horários e preços?

9.   Expectativas e Disposição à Adoção
* O que faria você trocar seu método atual por um sistema desses?
* Quais são suas maiores desconfianças em relação a um app de agendamento?
* Você já usou algum sistema antes? O que gostou e o que o fez abandonar?

---

10. Sessão extra pro futuro
* Como funciona a divisão de faturamento (comissão, aluguel de cadeira, salário)?
* Quais formas de pagamento você aceita?
* Você cobraria sinal ou pré-pagamento para reduzir faltas? Por quê não?
* Estaria disposto a receber pagamentos pelo aplicativo?
* Qual seria sua preocupação?
* O que faria você confiar em um sistema que gerencia seu dinheiro?
* Qual a faixa de idade e perfil do seu público?
* Você oferece combos, pacotes ou promoções?
* Como você preferiria pagar? (mensalidade fixa, comissão por agendamento, gratuito com taxa no pagamento)
* Se o app trouxesse clientes novos descontando comissão, isso te interessaria?
