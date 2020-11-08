FROM node:lts-alpine

ENV WORKDIR /opt/waline
WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
RUN npm install 

COPY package/server/vanilla.js ${WORKDIR}/vanilla.js
COPY package/server/src ${WORKDIR}/src

ENTRYPOINT [ "node", "${WORKDIR}/vanilla.js" ]