#!/bin/sh

# Executa as migrações usando o script definido no package.json
npm run prisma:migrate

# Inicia o servidor em modo desenvolvimento
npm run dev
