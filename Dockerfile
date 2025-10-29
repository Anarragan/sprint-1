# Stage 1 — build
FROM node:18-alpine AS builder
WORKDIR /app
# Instala dependencias de build
COPY package*.json ./
RUN npm ci
# Copia todo y construye
COPY . .
RUN npm run build

# Stage 2 — runtime (ligero)
FROM node:18-alpine AS runtime
WORKDIR /app
# Copia solo lo necesario desde builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3001

# ejecutar como usuario no-root
USER node

# Ajusta la entrypoint según tu build (Nest suele generar dist/main.js)
CMD ["node", "dist/main.js"]