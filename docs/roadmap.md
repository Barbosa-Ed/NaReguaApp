# Roadmap do TCC NaRéguaApp

## Objetivo e prazo

Entregar o artigo e uma versão funcional do NaRéguaApp até dezembro de 2026. A demonstração será local, sem publicação na Play Store. Como não há data oficial nem marcos intermediários definidos, as janelas abaixo são um plano de trabalho provisório, contado a partir de 21 de outubro de 2026. A equipe informou disponibilidade de pelo menos 20 horas semanais por pessoa; o plano pressupõe trabalho paralelo no artigo e no sistema.

## Decisões e limites atuais

- A nova implementação não deve usar o protótipo como base. O `README.md` é a referência de requisitos até que o grupo aprove mudanças.
- O produto será uma PWA instalável. TypeScript, PostgreSQL e React/React Native são direções iniciais; decisões detalhadas ficam para a techspec.
- O escopo acadêmico cobre os requisitos funcionais do README. Pagamento integrado e integração com WhatsApp ficam fora do TCC.
- A coleta de campo fica limitada ao questionário já realizado. Não estão previstos entrevistas nem testes com usuários.
- O resultado da pesquisa deve ser apresentado com os limites da amostra disponível; não generalizar as respostas para todo o público de barbearias ou clientes.
- Os materiais da disciplina servem como orientação provisória. Ainda é necessário verificar se há manual, modelo ou exigência específica da instituição para o artigo.

## Fases e marcos

| Janela provisória | Foco | Entregáveis e critério de conclusão |
|---|---|---|
| 21–27 out. | Fechar escopo e organizar o trabalho | Matriz dos RF/RNF com critérios demonstráveis; lista de dúvidas e riscos; estrutura inicial do artigo. Corrigir no anteprojeto as premissas antigas sobre Play Store e métodos de campo que não serão usados. |
| 28 out.–3 nov. | Techspec e plano da demonstração local | Techspec aprovada pela dupla, com arquitetura, ambiente local, papéis, dados de demonstração, mapa/geolocalização, notificações e estratégia de instalação da PWA. Definir em qual dispositivo a banca verá a PWA e como o serviço local será iniciado. |
| 28 out.–16 nov. | Revisão bibliográfica e redação inicial | Selecionar e fichar pelo menos três artigos sobre o tema e dois sobre as tecnologias escolhidas; redigir problema, justificativa, objetivos, fundamentação e metodologia. Conferir as referências e citações. |
| 4–16 nov. | Base técnica e primeiro fluxo vertical | Aplicação inicial executando localmente, banco configurado e fluxo ponta a ponta mínimo: consultar estabelecimento/serviços, escolher disponibilidade e criar agendamento. Registrar especificações, decisões e critérios de aceite antes de implementar cada bloco (SDD). |
| 17–30 nov. | Completar os fluxos do produto | Cobrir cadastro e gestão da barbearia, serviços, profissionais e agenda; perfil e localização; confirmação, cancelamento e liberação de horário; avaliações. Cada RF do README deve ter cenário de demonstração ou uma mudança de escopo aprovada e registrada. |
| 1–7 dez. | Integração e congelamento de escopo | Sistema integrado, fluxo de demonstração estável e requisitos rastreados. Resolver defeitos que impeçam os cenários principais; congelar novas funcionalidades ao fim da janela. |
| 8–14 dez. | Verificação final e artigo completo | Percorrer cenários de aceite com dados limpos; verificar regras de horário, permissões, notificações e instruções de execução local. Revisar o artigo completo, referências, citações e formatação conforme as exigências confirmadas da instituição. |
| 15–21 dez. | Preparar entrega e banca | Versão candidata à entrega, roteiro curto de demonstração, dados locais restauráveis e instruções para iniciar o sistema. Artigo e sistema prontos para submissão assim que a instituição indicar o procedimento. |
| 22–31 dez. | Reserva de prazo | Usar apenas para correções finais, ajustes de formatação ou contingências de entrega. Não planejar funcionalidades novas nesta janela. |

## Fluxos que precisam ser demonstráveis

1. Localizar e consultar uma barbearia, seus serviços e profissionais.
2. Gerenciar cadastro, serviços, horários disponíveis e bloqueios de agenda.
3. Criar um agendamento e impedir conflito para o mesmo horário.
4. Confirmar presença no período definido e liberar o horário quando a confirmação expirar.
5. Cancelar como cliente ou estabelecimento e mostrar a notificação prevista.
6. Concluir um atendimento e registrar uma avaliação.

O uso local exige que o banco, o backend e a PWA possam ser iniciados de forma repetível. A techspec deve esclarecer como a localização e as notificações serão demonstradas sem serviços externos indisponíveis no ambiente da banca. Se a instalação em celular fizer parte da apresentação, confirmar também como a PWA local será servida com a origem necessária para instalação.

## Plano do artigo

1. Confirmar com a instituição estrutura, normas e forma de entrega do artigo.
2. Atualizar o anteprojeto para refletir o escopo atual: PWA local, sem publicação na loja e sem novas entrevistas ou testes com usuários.
3. Fazer a revisão bibliográfica e registrar fichamentos para preservar a origem das ideias e citações.
4. Descrever a pesquisa aplicada, o questionário já realizado, seus respondentes e limites, além do processo de desenvolvimento e dos critérios de verificação do sistema.
5. Redigir resultados e conclusão a partir do que foi efetivamente implementado e verificado. Não afirmar validação de usabilidade com usuários se não houve teste com usuários.

## Divisão do trabalho

Na primeira semana, a dupla organiza as etapas e estima o esforço por entrega. Depois, atribui responsáveis por cada parte do artigo e do sistema, mantendo decisões de escopo, integração e revisão final em conjunto. A atribuição deve ficar registrada no backlog ou na techspec; este roadmap não presume uma divisão individual antes dessa conversa.

## Riscos e respostas

- **Prazo curto para artigo e sistema:** desenvolver um fluxo vertical cedo, trabalhar artigo e software em paralelo e congelar funcionalidades na primeira semana de dezembro.
- **Requisitos amplos para uma demonstração local:** manter matriz de rastreabilidade e decidir explicitamente qualquer corte, com aprovação da dupla.
- **Instalação, mapa ou notificações dependentes de ambiente/serviço:** validar esses pontos na techspec e preparar dados e alternativas locais para a demonstração.
- **Ausência de validação com usuários:** limitar conclusões à elicitação existente e à verificação técnica baseada nos critérios de aceite.
- **Exigências acadêmicas desconhecidas:** buscar o manual e o modelo da instituição no início; ajustar artigo e cronograma quando a orientação oficial aparecer.

## Critério de conclusão

O TCC está pronto para entrega quando o artigo estiver revisado e formatado segundo a orientação confirmada pela instituição, o sistema cobrir os requisitos acordados com uma demonstração local repetível, e a dupla tiver roteiro e dados de demonstração disponíveis. A data oficial de dezembro deve substituir a janela provisória assim que for comunicada.
