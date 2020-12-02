# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha, informando seu e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

**Requisitos Não Funcionais**


- Utilizar Mailtrap para testar o envio de e-mail em desenvolvimento.
- Utilizar o AMAZON SES para envios em produção.
- O envio de e-mails deve acontecer em segundo plano (background job).

**Regra de Negócio**

- O link enviado por e-mail para resetar a senha, deve expirar em 2horas.
- O usuário precisa confirmar a nova senha ao resetar.

# Atualização de perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, e-mail e senha.


**Regra de Negócio**

- O usuário não pode alterar e-mail para um email já utilizado.
- O usuário precisa confirmar a nova senha para atualizar.
- O usuário precisa informar a senha antiga para mudar a senha.

# Painel do prestador


**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder  visualizar as notificação não lidas.

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenadas em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.


**Regra de Negócio**

- A notificação deve ter um status de lida ou não lida para prestador controlar.


# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve visualizar todos os prestadores de serviço.
- O usuário deve poder visualizar os dias com pelo menos um horário disponivel do prestador.
- O usuário deve poder visualizar os horários disponiveis de um dia especifico do prestador.
- O usuário deve poder realizar um agendamento.

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache.

**Regra de Negócio**

- Cada agendamento deve durar 1 horas.
- Os agendaentos devem estar disponiveis entre as 8h ás 18h.
- O usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar em um horário consigo mesmo.


