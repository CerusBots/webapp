FROM node:16-alpine AS build

WORKDIR /usr/src/server
COPY . .

RUN npm config set update-notifier false
RUN npm ci --slient --no-audit --no-fund
RUN npm run build
RUN npm prune --production --silent --no-audit --no-fund
RUN npm install --silent --no-audit --no-fund -g clean-modules@2.0.4 && clean-modules -y

FROM node:16-alpine
RUN apk add --no-cache dumb-init
USER node
ENV NODE_ENV production
WORKDIR /usr/src/server

COPY --chown=node:node --from=build /usr/src/server/node_modules /usr/src/server/node_modules
COPY --chown=node:node --from=build /usr/src/server/.nuxt /usr/src/server/.nuxt
COPY --chown=node:node --from=build /usr/src/server/.output /usr/src/server/.output

EXPOSE 3000
ENTRYPOINT [ "dumb-init", "node", ".output/server/index.mjs" ]