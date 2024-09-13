# Install dependencies only when needed
FROM node:20.17.0 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20.17.0 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production image, copy all the files and run the application
FROM node:20.17.0 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]
