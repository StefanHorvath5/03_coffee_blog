FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

CMD ["npm", "run", "start:prod"]



# # DEV:
# FROM node:22-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# # RUN npm run build
# # CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:dev"]
