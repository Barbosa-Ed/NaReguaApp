# Rascunho de organização das issues por milestone

Este documento consolida descrições para as issues já existentes e propõe issues para as fases de implementação, verificação e entrega do roadmap. Os milestones 1–3 e as associações das issues existentes foram confirmados no GitHub. Os nomes abaixo dos milestones 4–9 seguem a ordem das fases no `roadmap.md`; confirmar os títulos/números no GitHub antes de aplicar.

## Milestone 1 — Fechar escopo e organizar o trabalho

### Issue #2 — Matriz dos RF/RNF com critérios demonstráveis

**Descrição sugerida**

Criar uma matriz de rastreabilidade entre os requisitos funcionais e não funcionais do README, critérios de aceite observáveis e cenários da demonstração.

**Tarefas**
- Listar cada RF e RNF vigente, incluindo regras de negócio e notificações associadas.
- Definir para cada requisito um resultado observável que permita verificar se foi atendido.
- Associar cada critério a um fluxo de demonstração e indicar dados e perfil necessários.
- Registrar ambiguidades, dependências e cortes de escopo aprovados pela dupla.

**Critérios de conclusão**
- Todos os requisitos dentro do escopo aparecem na matriz, sem requisito sem critério ou cenário.
- Os critérios podem ser verificados na aplicação ou por inspeção documentada.
- A dupla revisou e aprovou a matriz, que está versionada no repositório.

### Issue #3 — Identificar riscos, dúvidas e decisões pendentes

**Descrição sugerida**

Manter registro das dúvidas, riscos e decisões pendentes que possam afetar prazo, escopo, implementação ou apresentação.

**Tarefas**
- Registrar cada item com descrição, impacto, responsável pela decisão e prazo desejado.
- Incluir ausência de orientador/data de banca, exigências institucionais pendentes e dependências técnicas da demonstração local.
- Definir resposta ou acompanhamento para os riscos prioritários.

**Critérios de conclusão**
- O registro está versionado e foi revisado pela dupla.
- Itens prioritários têm responsável, próxima ação e data de revisão.
- Decisões tomadas são refletidas no roadmap, na matriz de requisitos ou na techspec.

### Issue #4 — Atualizar o anteprojeto para refletir a PWA local e os métodos de pesquisa definidos

**Descrição sugerida**

Atualizar o anteprojeto para que problema, objetivos, método e escopo correspondam às decisões atuais do TCC.

**Tarefas**
- Retirar a publicação na Play Store como requisito da entrega; a demonstração prevista é local por PWA.
- Não propor novas entrevistas nem testes com usuários: a pesquisa de campo considerada é o questionário já aplicado.
- Ajustar afirmações que dependam dessas premissas e conferir coerência com o README e o roadmap.
- Preservar as limitações da amostra e evitar generalizar os resultados do questionário.

**Critérios de conclusão**
- O anteprojeto revisado está salvo no repositório.
- Nenhuma seção mantém premissas incompatíveis com o escopo aprovado.
- Gabriel e Ednaldo revisaram a versão atualizada.

### Issue #5 — Organizar as etapas e estimar o esforço antes de atribuir responsáveis

**Descrição sugerida**

Organizar as entregas do roadmap, estimar esforço e combinar a participação de Gabriel e Ednaldo.

**Tarefas**
- Revisar fases, dependências e janelas provisórias do roadmap.
- Estimar esforço por entrega e registrar disponibilidade, bloqueios e margem para revisão.
- Definir responsáveis por desenvolvimento, pesquisa e redação; registrar tarefas compartilhadas.
- Revisar as estimativas quando houver orientação oficial ou data de banca.

**Critérios de conclusão**
- Estimativas e responsáveis estão registrados no backlog ou em documento versionado.
- Toda entrega de curto prazo tem responsável e dependências identificadas.
- A dupla validou que o plano cabe no prazo disponível até dezembro.

### Nova issue — Criar a estrutura inicial do artigo

**Descrição sugerida**

Preparar o esqueleto do artigo no modelo institucional disponível, com seções e subseções previstas, para que pesquisa e redação sejam feitas diretamente na estrutura aprovada.

**Tarefas**
- Confirmar as orientações acadêmicas disponíveis e usar o modelo indicado pela instituição, se houver.
- Criar a estrutura inicial com títulos e subseções, sem preencher conteúdo ainda não pesquisado.
- Incluir espaços para referências, metodologia, resultados, discussão, conclusão e limitações conforme o modelo.
- Relacionar as seções às tarefas do artigo no backlog.

**Critérios de conclusão**
- Existe um arquivo inicial do artigo no modelo/estrutura institucional disponível.
- As seções obrigatórias conhecidas estão presentes e a dupla aprovou o esqueleto.
- Exigências ainda desconhecidas ficam registradas como pendências, sem serem inventadas.

## Milestone 2 — Techspec e plano da demonstração local

### Issue #6 — Definir arquitetura, tecnologias, papéis e principais entidades

**Descrição sugerida**

Produzir a techspec da nova implementação, orientando arquitetura, ambiente local e divisão dos componentes. O protótipo atual não deve ser usado como base.

**Tarefas**
- Escolher e justificar linguagens, frameworks, banco de dados e ferramentas.
- Definir arquitetura e responsabilidades dos componentes de interface, backend e persistência.
- Descrever papéis e permissões de cliente, gerente/dono e profissional.
- Modelar estabelecimentos, serviços, profissionais, disponibilidade, agendamentos e avaliações.
- Definir organização do repositório e procedimento de configuração local.

**Critérios de conclusão**
- A techspec descreve decisões, alternativas relevantes e consequências.
- O modelo de entidades cobre os dados necessários aos requisitos do README.
- A dupla aprovou e registrou a techspec antes de implementar a base.

### Issue #7 — Especificar localização, mapa e notificações para o ambiente de demonstração

**Descrição sugerida**

Especificar como geolocalização, mapa e notificações funcionarão na instalação local de demonstração.

**Tarefas**
- Definir origem e dados de localização usados na apresentação, incluindo comportamento se a localização real não estiver disponível.
- Escolher a solução de mapa e documentar configuração e serviços/chaves necessários.
- Definir como demonstrar lembretes de confirmação, lembrete uma hora antes e cancelamento pelo estabelecimento.
- Documentar alternativas para falta de internet, permissão de localização ou serviço externo.

**Critérios de conclusão**
- A techspec permite reproduzir a demonstração de localização e notificações.
- Dependências, configuração e alternativas estão registradas.
- O plano não depende de pagamento integrado nem de WhatsApp.

### Issue #8 — Definir dispositivo de apresentação e procedimento para iniciar o sistema

**Descrição sugerida**

Definir o dispositivo e o procedimento repetível para executar e apresentar a aplicação localmente.

**Tarefas**
- Escolher o dispositivo principal e confirmar compatibilidade com a PWA.
- Documentar pré-requisitos, configuração e comandos para iniciar banco, backend e frontend.
- Explicar como acessar a PWA no dispositivo e preparar a origem local para instalação, se necessário.
- Definir dados de demonstração e passos para restaurá-los antes da apresentação.

**Critérios de conclusão**
- Uma pessoa da dupla consegue seguir as instruções em ambiente limpo e iniciar o sistema.
- O dispositivo escolhido consegue percorrer os fluxos previstos.
- Instruções e limitações de rede/serviços externos estão registradas.

### Issue #9 — Registrar decisões e critérios de aceite conforme o fluxo SDD

**Descrição sugerida**

Definir como a dupla aplicará Spec-Driven Development (SDD) e manterá decisões e critérios rastreáveis.

**Tarefas**
- Definir onde ficam requisitos, especificações, decisões e critérios de aceite no repositório.
- Descrever o fluxo requisito → spec → revisão/aprovação → implementação → verificação → atualização da documentação.
- Definir como mudanças de escopo e divergências entre README, specs e código serão registradas.
- Aplicar o fluxo a pelo menos um requisito como exemplo.

**Critérios de conclusão**
- O procedimento SDD está documentado e aprovado pela dupla.
- Existe uma spec de exemplo com critérios de aceite verificáveis.
- As issues de implementação podem apontar para specs e critérios correspondentes.

## Milestone 3 — Revisão bibliográfica e redação inicial

### Issue #10 — Confirmar estrutura, modelo e normas exigidas para o artigo

**Descrição sugerida**

Confirmar as regras acadêmicas que orientarão a estrutura, a formatação e a entrega do artigo.

**Tarefas**
- Consultar os materiais de Metodologia de Pesquisa disponibilizados pela faculdade.
- Verificar manual, modelo oficial, normas de formatação, estrutura, limite de páginas e padrão de referências.
- Registrar o que é exigência confirmada e o que depende de orientador ou coordenação.
- Atualizar a estrutura do artigo e o plano de revisão conforme as regras encontradas.

**Critérios de conclusão**
- Exigências e fontes institucionais estão resumidas em documento versionado.
- A dupla dispõe de um modelo/estrutura compatível com as orientações disponíveis.
- Pendências institucionais têm responsável e próxima ação.

### Issue #11 — Selecionar e fichar pelo menos três artigos sobre o tema

**Descrição sugerida**

Selecionar e fichar pelo menos três artigos acadêmicos relacionados ao tema para compor o referencial teórico.

**Tarefas**
- Definir termos de busca e critérios de inclusão relacionados a agendamento, serviços de barbearia/beleza ou descoberta local.
- Buscar artigos em fontes acadêmicas e registrar dados bibliográficos completos.
- Fichar objetivo, método, resultados e contribuição de cada artigo para o TCC.
- Relacionar cada fonte a uma seção ou argumento do artigo.

**Critérios de conclusão**
- Há pelo menos três artigos pertinentes com referência verificável e fichamento salvo.
- As fontes foram avaliadas pela relevância; páginas comerciais não contam como artigos.
- A dupla sabe onde cada fonte será usada no texto.

### Issue #12 — Selecionar e fichar pelo menos dois artigos sobre as tecnologias

**Descrição sugerida**

Após a decisão da techspec, selecionar e fichar pelo menos dois artigos que sustentem escolhas tecnológicas ou práticas de engenharia relevantes ao sistema.

**Tarefas**
- Usar a stack definida na techspec para delimitar os temas de busca.
- Selecionar pelo menos dois artigos pertinentes a tecnologias, arquitetura, PWA, geolocalização, notificações, segurança ou desenvolvimento adotados.
- Registrar referência, objetivo, método, resultados e relação com uma decisão técnica.
- Evitar fichar tecnologias que deixaram de fazer parte da solução.

**Critérios de conclusão**
- Existem pelo menos dois fichamentos coerentes com a stack aprovada.
- Cada fichamento está vinculado a uma decisão ou seção do artigo.
- As referências podem ser recuperadas e verificadas.

### Issue #13 — Redigir problema, justificativa, objetivos, fundamentação e metodologia

**Descrição sugerida**

Redigir a primeira versão das seções centrais do artigo, coerente com o anteprojeto atualizado e as evidências disponíveis.

**Tarefas**
- Redigir problema de pesquisa, justificativa e objetivos.
- Desenvolver a fundamentação com apoio dos fichamentos e citações rastreáveis.
- Descrever metodologia, questionário aplicado, perfil e quantidade de respondentes, análise realizada e limitações.
- Explicar a abordagem de desenvolvimento SDD e os critérios planejados para verificar o sistema.
- Não afirmar testes de usabilidade, entrevistas ou resultados ainda não obtidos.

**Critérios de conclusão**
- As seções estão em um rascunho contínuo no modelo confirmado.
- Afirmações têm fonte ou evidência identificável.
- A dupla revisou a coerência com objetivos, escopo e metodologia.

### Issue #14 — Registrar referências e citações durante a leitura

**Descrição sugerida**

Manter referências e citações rastreáveis durante a leitura e a redação do artigo.

**Tarefas**
- Registrar dados bibliográficos completos, DOI/link, data de acesso quando aplicável e arquivo consultado.
- Anotar páginas ou trechos que sustentem cada ideia, distinguindo citação direta de paráfrase.
- Manter uma lista única de referências e atualizar as citações conforme o padrão institucional.
- Conferir se toda citação tem referência correspondente e vice-versa.

**Critérios de conclusão**
- As fontes citadas podem ser recuperadas e verificadas.
- Não há citações sem fonte identificada nem referências não utilizadas sem justificativa.
- A formatação segue as orientações confirmadas da instituição.

## Milestone 4 — Base técnica e primeiro fluxo vertical

### Nova issue — Preparar ambiente local e persistência inicial

**Descrição sugerida**

Criar a base da nova implementação e preparar a execução local repetível. Não reutilizar a estrutura do protótipo anexado.

**Tarefas**
- Inicializar os projetos/componentes definidos na techspec.
- Configurar variáveis de ambiente de exemplo sem incluir segredos no repositório.
- Configurar banco e migrações para as entidades necessárias ao primeiro fluxo.
- Incluir dados de demonstração reproduzíveis e instruções iniciais de execução.

**Critérios de conclusão**
- Aplicação e banco iniciam localmente seguindo instruções versionadas.
- Migrações e dados de demonstração podem ser aplicados de forma repetível.
- A estrutura corresponde à techspec aprovada e não depende do protótipo.

### Nova issue — Implementar o primeiro fluxo vertical de consulta e agendamento

**Descrição sugerida**

Implementar um fluxo ponta a ponta mínimo para demonstrar consulta de estabelecimento/serviços, escolha de disponibilidade e criação de agendamento.

**Tarefas**
- Exibir estabelecimento e serviços usando dados de demonstração.
- Permitir selecionar serviço, profissional, data e horário disponível.
- Persistir o agendamento e mostrar confirmação ao cliente.
- Impedir que o mesmo horário seja agendado duas vezes.
- Criar e revisar uma spec SDD com critérios de aceite antes da implementação.

**Critérios de conclusão**
- O fluxo pode ser executado do início ao fim localmente com dados de demonstração.
- O agendamento fica persistido e conflito de horário é recusado.
- Cenários de aceite da spec foram verificados e registrados.

## Milestone 5 — Completar os fluxos do produto

### Nova issue — Implementar cadastro e perfil de barbearias com localização

**Descrição sugerida**

Implementar o cadastro gratuito da barbearia e a visualização/localização de estabelecimentos conforme os RF00, RF01 e RF02.

**Tarefas**
- Cadastrar dados do estabelecimento, endereço/localização e telefone.
- Exibir estabelecimentos próximos em mapa/lista, ordenados por proximidade conforme a solução da techspec.
- Exibir endereço, fotos disponíveis, telefone, horários, serviços e profissionais no perfil.
- Tratar indisponibilidade de geolocalização conforme o fallback definido.

**Critérios de conclusão**
- O estabelecimento pode ser cadastrado e consultado na demonstração local.
- Distância/ordenação e perfil apresentam os dados previstos nos critérios de aceite.
- O fluxo funciona com o fallback documentado quando localização real não estiver disponível.

### Nova issue — Implementar gestão de serviços e profissionais

**Descrição sugerida**

Permitir que gerente/dono mantenha o catálogo de serviços e que profissionais estejam associados ao estabelecimento.

**Tarefas**
- Cadastrar, editar e remover serviços com nome, duração e valor.
- Cadastrar/associar profissionais e definir dados necessários à agenda.
- Garantir que cliente consulte serviços e profissionais ativos no perfil.
- Aplicar papéis e permissões definidos na techspec.

**Critérios de conclusão**
- Operações de cadastro, edição e remoção funcionam para usuário autorizado.
- Alterações refletem no perfil e no fluxo de agendamento.
- Usuários sem permissão não conseguem alterar catálogo/equipe.

### Nova issue — Implementar disponibilidade e bloqueios da agenda

**Descrição sugerida**

Implementar a gestão de horários disponíveis e bloqueios do profissional conforme RF05.

**Tarefas**
- Permitir criar horários de atendimento disponíveis.
- Permitir visualizar a agenda e bloquear horários.
- Respeitar duração do serviço e horários já ocupados/bloqueados ao calcular disponibilidade.
- Registrar uma spec SDD com regras e cenários de conflito.

**Critérios de conclusão**
- Profissional autorizado consegue criar, consultar e bloquear horários.
- Horários bloqueados ou ocupados não aparecem como disponíveis para agendamento.
- Casos de conflito e limites de horário foram verificados.

### Nova issue — Implementar ciclo de confirmação, cancelamento e liberação de agendamentos

**Descrição sugerida**

Completar o ciclo de vida do agendamento dos RF03, RF06 e RF07, incluindo regras de confirmação, cancelamento e liberação.

**Tarefas**
- Solicitar confirmação de presença 24 horas antes do horário.
- Liberar automaticamente o horário se não houver confirmação até 5 horas antes.
- Enviar lembrete uma hora antes para agendamentos confirmados.
- Permitir cancelamento pelo cliente, profissional ou administrador da barbearia.
- Notificar o cliente quando o estabelecimento cancelar.
- Liberar imediatamente horário cancelado ou expirado, sem tolerância adicional.

**Critérios de conclusão**
- Prazos e transições de estado seguem as regras do README.
- Horário liberado volta a ficar disponível para outro cliente.
- Notificações podem ser demonstradas localmente conforme a techspec.
- Casos limite de cancelamento/expiração foram verificados.

### Nova issue — Implementar conclusão do atendimento e avaliações

**Descrição sugerida**

Permitir registrar a conclusão do atendimento e avaliação do barbeiro conforme RF08.

**Tarefas**
- Marcar um agendamento atendido como concluído.
- Permitir ao cliente que concluiu o atendimento registrar nota de 1 a 5 e comentário opcional.
- Exibir média das notas e comentários no perfil do profissional e da barbearia.
- Impedir avaliação duplicada ou avaliação de atendimento não concluído.

**Critérios de conclusão**
- Avaliação só pode ser registrada para atendimento concluído pelo cliente correspondente.
- Nota, comentário e média são persistidos e exibidos corretamente.
- Regras de duplicidade e permissão foram verificadas.

## Milestone 6 — Integração e congelamento de escopo

### Nova issue — Integrar módulos e estabilizar o fluxo de demonstração

**Descrição sugerida**

Integrar os componentes implementados e garantir que os principais fluxos possam ser percorridos sem bloqueios na execução local.

**Tarefas**
- Integrar interface, backend, banco e notificações/mapa conforme a techspec.
- Percorrer fluxos cliente e barbearia com dados de demonstração.
- Resolver falhas que interrompam cadastro, agenda, agendamento, cancelamento ou avaliação.
- Registrar limitações conhecidas e decisões de escopo pendentes.

**Critérios de conclusão**
- Os fluxos principais integrados funcionam no ambiente local.
- Dados persistem entre etapas e estados do agendamento permanecem consistentes.
- Não há defeito bloqueador conhecido sem plano de correção.

### Nova issue — Revisar rastreabilidade e congelar escopo

**Descrição sugerida**

Revisar a cobertura dos requisitos acordados e congelar novas funcionalidades antes da verificação final.

**Tarefas**
- Comparar cada RF/RNF da matriz com implementação, critério de aceite e evidência.
- Registrar requisito não implementado, limitação ou corte aprovado pela dupla.
- Priorizar apenas correções necessárias aos cenários de aceite e demonstração.
- Atualizar roadmap e artigo se uma mudança de escopo for aprovada.

**Critérios de conclusão**
- Cada requisito tem estado e evidência/pendência registrados.
- Cortes e limitações estão aprovados e documentados.
- A dupla declarou congelado o escopo de funcionalidades.

## Milestone 7 — Verificação final e artigo completo

### Nova issue — Verificar cenários de aceite e requisitos não funcionais

**Descrição sugerida**

Executar a verificação final dos cenários da matriz, com dados controlados, e registrar os resultados.

**Tarefas**
- Percorrer os fluxos de busca/perfil, gestão, agendamento, confirmação, cancelamento, notificações e avaliação.
- Verificar regras de conflito de horário, prazos, permissões e consistência dos dados.
- Conferir desempenho/responsividade da busca e do mapa em condições de demonstração.
- Registrar cenário, resultado esperado, resultado observado e defeitos encontrados.

**Critérios de conclusão**
- Todos os critérios de aceite têm resultado registrado.
- Defeitos bloqueadores da demonstração foram corrigidos ou têm limitação documentada e aceita.
- O relatório não declara validação de usabilidade com usuários, pois não haverá teste com usuários.

### Nova issue — Concluir revisão, referências e formatação do artigo

**Descrição sugerida**

Completar e revisar o artigo com base no que foi efetivamente especificado, implementado e verificado.

**Tarefas**
- Redigir resultados, discussão, limitações e conclusão com evidências reais do projeto.
- Revisar consistência entre problema, objetivos, método, resultados e conclusão.
- Conferir citações, referências, formatação e estrutura conforme as exigências institucionais confirmadas.
- Revisar gramática e incorporar revisão cruzada da dupla.

**Critérios de conclusão**
- Todas as seções obrigatórias estão preenchidas e revisadas.
- Citações e referências estão consistentes e verificáveis.
- O texto não atribui ao sistema ou à pesquisa resultados que não foram obtidos.

### Nova issue — Conferir instruções de execução local

**Descrição sugerida**

Validar que as instruções de instalação e execução local funcionam antes da entrega.

**Tarefas**
- Seguir as instruções em ambiente limpo ou após remover dados/configurações locais prévias.
- Confirmar configuração do banco, dados de demonstração, backend, frontend e acesso pela PWA.
- Atualizar comandos, pré-requisitos e solução de problemas comuns.
- Confirmar estratégia de localização e notificações no ambiente definido.

**Critérios de conclusão**
- A dupla consegue reproduzir a inicialização usando somente a documentação.
- O roteiro funciona no dispositivo escolhido para apresentação.
- Limitações e dependências externas estão documentadas.

## Milestone 8 — Preparar entrega e banca

### Nova issue — Preparar versão candidata à entrega e dados restauráveis

**Descrição sugerida**

Preparar uma versão estável da aplicação e os dados que serão usados na apresentação.

**Tarefas**
- Identificar uma versão candidata e registrar revisão/commit correspondente.
- Preparar conjunto de dados limpo, coerente e restaurável para a demonstração.
- Confirmar que o sistema inicia e percorre os fluxos previstos no dispositivo escolhido.
- Registrar como restaurar o estado inicial após um ensaio.

**Critérios de conclusão**
- A versão candidata está identificada e inicia conforme as instruções.
- Dados de demonstração podem ser restaurados sem edição manual improvisada.
- Os fluxos essenciais foram percorridos na versão candidata.

### Nova issue — Preparar roteiro e ensaiar a demonstração

**Descrição sugerida**

Montar e ensaiar uma apresentação curta que demonstre o problema, a solução e os critérios atendidos pelo sistema.

**Tarefas**
- Preparar sequência de demonstração com perfis e dados de teste definidos.
- Relacionar cada etapa aos RF e critérios de aceite correspondentes.
- Dividir falas e operação do sistema entre Gabriel e Ednaldo.
- Ensaiar o fluxo e preparar alternativa para falha de rede ou serviço externo.

**Critérios de conclusão**
- O roteiro cabe no tempo que a instituição definir ou, enquanto desconhecido, tem duração estimada registrada.
- Ambos conseguem apresentar suas partes e conduzir os fluxos.
- Existe plano de contingência para os pontos dependentes de ambiente externo.

### Nova issue — Confirmar procedimento de submissão do TCC

**Descrição sugerida**

Confirmar como artigo e sistema devem ser entregues à instituição e preparar os arquivos finais.

**Tarefas**
- Confirmar com coordenação/orientador os formatos, plataforma, prazo e materiais exigidos.
- Preparar artigo final, código/fonte e instruções no formato solicitado.
- Conferir se links, anexos e identificação da dupla estão corretos.

**Critérios de conclusão**
- Procedimento, prazo e formatos oficiais estão registrados.
- Materiais exigidos estão preparados e revisados.
- A submissão ocorre dentro do prazo comunicado pela instituição.

## Milestone 9 — Reserva de prazo

### Nova issue — Usar janela de reserva para correções finais e contingências

**Descrição sugerida**

Reservar a janela final do cronograma para correções de bloqueio, adequações institucionais ou contingências da entrega.

**Tarefas**
- Registrar cada correção/contingência que surgir, seu impacto e responsável.
- Priorizar apenas defeitos bloqueadores, correções solicitadas pela instituição e ajustes finais de formatação.
- Evitar iniciar funcionalidades novas durante a reserva.

**Critérios de conclusão**
- Pendências críticas foram resolvidas ou formalmente comunicadas à instituição.
- Artigo e sistema continuam entregáveis após os ajustes.
- A janela não foi consumida por funcionalidades novas fora do escopo.
