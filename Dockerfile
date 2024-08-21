FROM node:18 AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18-alpine
WORKDIR /app

COPY --from=builder /usr/app/dist ./dist

COPY --from=builder /usr/app/package.json ./package.json

COPY --from=builder /usr/app/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/main.js"]