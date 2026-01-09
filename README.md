# FastFood Auth - Autenticação Serverless

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900)
![Fastify](https://img.shields.io/badge/Fastify-5.x-black)

## 📋 Sobre o Serviço

Função Lambda serverless responsável pela autenticação de clientes no sistema FastFood. Implementa autenticação por CPF com geração de tokens JWT, seguindo arquitetura hexagonal.

## 🎯 Responsabilidades

### Core Business
- **Autenticação por CPF**: Validação de CPF e autenticação de clientes
- **Geração de JWT**: Criação de tokens JWT para sessões autenticadas
- **Validação de Credenciais**: Verificação de clientes no banco de dados
- **API Gateway Integration**: Endpoint REST via AWS API Gateway

### Características
- **Serverless**: Pay-per-request, escalabilidade automática
- **Stateless**: Autenticação baseada em tokens JWT
- **Integração com RDS**: Acesso ao banco MySQL compartilhado

## 🏗️ Arquitetura

### Estrutura do Projeto

```
src/
├── application/            → Casos de uso
│   └── use-cases/
│       └── auth/           → Autenticação JWT
│
├── domain/                 → Entidades e regras de negócio
│   ├── entities/           → Client entity
│   ├── repositories/       → Interfaces de repositório
│   └── services/           → Serviços de domínio (JWT)
│
├── infrastructure/         → Implementações técnicas
│   ├── config/             → Configuração e DI
│   ├── database/           → Prisma schema
│   ├── repositories/       → Implementação Prisma
│   └── services/           → JWT implementation
│
├── interfaces/             → Controllers e HTTP
│   ├── controller/         → Auth controller
│   └── http/               → Routes, schemas, middlewares
│
└── main/                   → Entry point Lambda
    └── index.ts            → Lambda handler
```

### Arquitetura Serverless

```
┌─────────────────┐
│   API Gateway   │
│  (HTTPS/REST)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│ Lambda Function │───▶│   RDS MySQL     │
│  (Node.js 22.x) │    │  (Shared DB)    │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   CloudWatch    │
│  (Logs/Metrics) │
└─────────────────┘
```

## 🛠️ Stack Tecnológica

### Core
- **Runtime**: Node.js 22.x
- **Linguagem**: TypeScript 5.x
- **Framework**: Fastify 5.x + @fastify/aws-lambda
- **Database**: MySQL 8.0 (Amazon RDS - compartilhado)
- **Serverless**: AWS Lambda + API Gateway

### Bibliotecas Principais
- **Autenticação**: jsonwebtoken
- **Validação**: Zod + cpf-cnpj-validator
- **Injeção de Dependência**: InversifyJS
- **Documentação**: Swagger/OpenAPI
- **Logging**: Pino
- **Testes**: Vitest + @vitest/coverage-v8

### AWS Services
- **Lambda**: Compute serverless
- **API Gateway**: Endpoint HTTPS público
- **CloudWatch**: Logs e monitoramento
- **RDS MySQL**: Banco compartilhado
- **IAM**: Permissões granulares

## 🚀 Como Executar

### Pré-requisitos
- Node.js 22+
- AWS CLI configurado (para deploy)
- Terraform >= 1.0 (para infraestrutura)

### Instalação Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Executar em modo desenvolvimento
npm run dev
```

### Build e Deploy

```bash
# Build da aplicação
npm run build

# Build e empacotamento para Lambda
npm run build:package

# Deploy via Terraform
cd terraform
terraform init
terraform apply
```

### Teste Local

```bash
# Testar endpoint localmente
curl -X POST http://localhost:3000/auth \
  -H "Content-Type: application/json" \
  -d '{"cpf":"12345678901"}'
```

## 🧪 Testes e Cobertura

### Executar Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Evidências de Cobertura

A função Lambda possui testes automatizados com cobertura de código usando Vitest.

**Cobertura Atual:**

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   80+   |   75+    |   78+   |   80+   |
 application/         |   85+   |   80+    |   82+   |   86+   |
 domain/              |   90+   |   85+    |   88+   |   91+   |
 infrastructure/      |   75+   |   70+    |   72+   |   76+   |
 interfaces/          |   82+   |   76+    |   80+   |   83+   |
----------------------|---------|----------|---------|---------|
```

Os testes cobrem:
- ✅ Validação de CPF
- ✅ Geração de JWT
- ✅ Casos de uso de autenticação
- ✅ Integração com banco de dados
- ✅ Controllers e rotas

O coverage dos testes está disponível em [index.html](./coverage/index.html).

## 📡 API Endpoint

### POST /auth

Autentica um cliente por CPF e retorna token JWT.

**Request:**
```json
{
  "cpf": "12345678901"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "client": {
    "id": "uuid",
    "name": "Nome do Cliente",
    "cpf": "12345678901",
    "email": "cliente@email.com"
  }
}
```

**Response (404):**
```json
{
  "error": "Cliente não encontrado"
}
```

## 🔒 Segurança

- **JWT Tokens**: Assinados com chave secreta configurável
- **CPF Validation**: Validação usando cpf-cnpj-validator
- **CORS**: Configurado no API Gateway
- **IAM**: Permissões mínimas necessárias
- **Environment Variables**: Secrets via AWS Lambda environment

## 📊 Monitoramento

### CloudWatch Logs
- Logs estruturados com Pino
- Rastreamento de requisições
- Erros e exceções

### CloudWatch Metrics
- Invocações da Lambda
- Duração de execução
- Taxa de erros
- Cold starts

## 🔗 Repositórios Relacionados

- **[fast-food](https://github.com/fiap-software-architecture-tech/fast-food)** - Aplicação Principal
- **[fast-food-order](https://github.com/fiap-software-architecture-tech/fast-food-order)** - Microsserviço de Pedidos
- **[fast-food-payment](https://github.com/fiap-software-architecture-tech/fast-food-payment)** - Microsserviço de Pagamentos
- **[fast-food-db-infra](https://github.com/fiap-software-architecture-tech/fast-food-db-infra)** - Infraestrutura de Banco de Dados

## 💰 Custo Estimado

- **Lambda**: ~$0-5/mês (pay-per-request)
- **API Gateway**: ~$0-3/mês
- **CloudWatch Logs**: ~$0-2/mês

**Total**: ~$0-10/mês (baixo custo devido ao modelo serverless)

## 👥 Equipe

**Grupo 277 - SOAT FIAP**

- Leonardo Andreas (RM 361923)
- Gabriel Gomes (RM 361899)
- Willian Borba (RM 364043)
- Fabio Smaniotto (RM 362223)

## 📄 Licença

Este projeto faz parte do Tech Challenge do programa de pós-graduação em Software Architecture da FIAP.
