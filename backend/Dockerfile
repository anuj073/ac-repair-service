FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma/

RUN npm ci --legacy-peer-deps

COPY src ./src

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./

RUN mkdir -p uploads logs && chown nodeuser:nodejs uploads logs

USER nodeuser

EXPOSE 5000

CMD ["node", "dist/server.js"]