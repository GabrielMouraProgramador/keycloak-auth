# 🧠 Projeto Clean Architecture

Este projeto é uma aplicação baseada nos princípios da **Clean Architecture**, separando claramente as regras de negócio, casos de uso, infraestrutura e interfaces.

---

## 📁 Estrutura de Pastas

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
│── /config                     # Configurações gerais (ex: banco de dados, env)
│── /tests                      # Testes unitários e de integração
│── server.ts                   # Arquivo de entrada principal
│── package.json
│── tsconfig.json
│── .env
```
