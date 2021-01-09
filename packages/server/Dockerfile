# build
FROM node:lts AS build

ENV WORKDIR /opt/waline
ENV TZ Asia/Shanghai

WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
RUN npm install --production

# alpine
FROM node:lts-alpine

ENV WORKDIR /opt/waline
ENV TZ Asia/Shanghai

WORKDIR ${WORKDIR}

COPY packages/server/vanilla.js ${WORKDIR}/vanilla.js
COPY packages/server/src ${WORKDIR}/src
COPY --from=build /opt/waline/node_modules ./node_modules

EXPOSE 8360
ENTRYPOINT [ "node", "vanilla.js" ]
