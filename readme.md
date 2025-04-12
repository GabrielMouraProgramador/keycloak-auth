# 🧠 Projeto Clean Architecture

Este projeto é uma aplicação baseada nos princípios da **Clean Architecture**, separando claramente as regras de negócio, casos de uso, infraestrutura e interfaces.

---

# 📁 Frontend com Nuxt

Projeto desenvolvido com foco em arquitetura escalável, autenticação robusta e boas práticas de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- **[Nuxt.js](https://nuxt.com/)** + **[Vuetify](https://vuetifyjs.com/)** — Frontend moderno e responsivo
- **[Prisma ORM](https://www.prisma.io/)** — Mapeamento objeto-relacional
- **[Keycloak](https://www.keycloak.org/)** — Autenticação e autorização via OAuth2
- **[Fastify](https://www.fastify.io/)** — Servidor web leve e eficiente
- **[PostgreSQL](https://www.postgresql.org/)** — Banco de dados relacional
- **[Docker](https://www.docker.com/)** + **Docker Compose** — Gerenciamento de containers
- **Princípios SOLID** + **DDD (Domain-Driven Design)** — Arquitetura orientada ao domínio

---

## 🔐 Autenticação

Rotas principais disponíveis:

- `POST /auth/register` — Registro de um novo cliente e admin
- `POST /auth/login-admin` — Login do administrador

---

## 🛡️ Integração com Keycloak

- Para **cada subdomínio**, é criado automaticamente um **Realm** no Keycloak.
- O campo `consumer` recebe o valor `ADMIN`, representando um cliente administrativo.
- O nome da empresa (utilizado como identificador único) é representado no backend pela variável `RealmUnique`.

---

## 🧑‍💼 Criação de Cliente e Usuário Admin

Ao realizar o cadastro via rota `/auth/register`:

1. Um **Realm** exclusivo é criado no Keycloak com base no nome da empresa.
2. Um **cliente** chamado `admin-dashboard` é registrado nesse Realm.
3. Um **usuário administrador** é criado com o e-mail e senha informados no momento do registro.

---

## 📦 Como Executar com Docker

```bash
docker-compose up --build
```

---

## 📁 Estrutura de Pastas BACKEND exemplo

```bash
/src
│── /application                # Casos de uso (Application Business Rules)
│   │── /use-cases
│   │   │── /checkout
│   │   │   ├── CheckoutUseCase.ts
│   │   │── /order
│   │   │   ├── CreateOrderUseCase.ts
│   │   │   ├── GetOrderUseCase.ts
│   │   │── /payment
│   │   │   ├── ProcessPaymentUseCase.ts
│   │   │── /transaction
│   │   │   ├── CreateTransactionUseCase.ts
│   │   │
│   │── /services
│   │   │── RegisterService.ts
│
│── /domain                     # Regras de Negócio (Enterprise Business Rules)
│   │── /entities
│   │   │── Product.ts
│   │   │── Order.ts
│   │   │── Customer.ts
│   │   │── Payment.ts
│   │   │── Transaction.ts
│   │── /repositories
│   │   │── IProductRepository.ts
│   │   │── IOrderRepository.ts
│   │   │── ICustomerRepository.ts
│   │   │── IPaymentRepository.ts
│   │   │── ITransactionRepository.ts
│   │── /value-objects
│   │   │── Money.ts
│   │   │── Address.ts
│
│── /infrastructure             # Frameworks e Drivers (Implementações)
│   │── /repositories
│   │   │── ProductRepository.ts
│   │   │── OrderRepository.ts
│   │   │── CustomerRepository.ts
│   │   │── PaymentRepository.ts
│   │   │── TransactionRepository.ts
│   │── /services
│   │   │── PaymentGateway.ts
│   │── /database
│   │   │── prisma
│   │   │   ├── schema.prisma
│
│── /interfaces                 # Adaptadores de Interface
│   │── /controllers
│   │   │── CheckoutController.ts
│   │   │── OrderController.ts
│   │   │── PaymentController.ts
│   │── /routes
│   │   │── checkoutRoutes.ts
│   │   │── orderRoutes.ts
│   │   │── paymentRoutes.ts
│   │── /dtos
│   │   │── OrderDTO.ts
│   │   │── PaymentDTO.ts
│   │── /mappers
│   │   │── OrderMapper.ts
│
│
│
│── /config                    # Configurações gerais (ex: banco de dados,
│── /tests                     # Testes unitários e de integração
│── server.ts                  # Arquivo de entrada principal
│── package.json
│── tsconfig.json
│── .env
```

---
