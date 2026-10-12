export const APPOINTMENT_RULES = {
  // Disparo 1: Lembrete de confirmação de presença (em horas antes do horário agendado)
  CONFIRMATION_REMINDER_HOURS_BEFORE: 24,

  // Prazo limite para confirmação antes da liberação automática do horário (em horas antes)
  AUTO_CANCEL_HOURS_BEFORE: 5,

  // Disparo 2: Lembrete final de comparecimento para agendamentos confirmados (em horas antes)
  FINAL_REMINDER_HOURS_BEFORE: 1,

  // Raio padrão de busca em quilômetros
  DEFAULT_SEARCH_RADIUS_KM: 10,
} as const;

export const DAYS_OF_WEEK = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

