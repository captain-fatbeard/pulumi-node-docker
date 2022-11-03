FROM node:alpine as build

COPY . .

RUN npm ci

RUN npm run build

FROM node:alpine as prod

WORKDIR /app

COPY --from=build node_modules ./node_modules
COPY --from=build package.json ./package.json
COPY --from=build .next ./.next
COPY --from=build public ./public

CMD ["npm", "run", "start"]
