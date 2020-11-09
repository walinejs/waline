FROM node:lts-alpine

ENV WORKDIR /opt/waline
WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
RUN npm install 

COPY packages/server/vanilla.js ${WORKDIR}/vanilla.js
COPY packages/server/src ${WORKDIR}/src

ENTRYPOINT [ "node", "vanilla.js" ]