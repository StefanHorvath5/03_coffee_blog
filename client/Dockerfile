FROM node:22-alpine AS builder
WORKDIR /app
# ARG NEXT_PUBLIC_API_URL
# ARG NEXT_PUBLIC_SERVER_API_URL
COPY package*.json ./
RUN npm ci
COPY . .
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_SERVER_API_URL=$NEXT_PUBLIC_SERVER_API_URL
RUN npm run build
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
USER node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

CMD ["npm", "start"]



# # DEV:
# FROM node:22-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# # RUN npm run build
# # CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
