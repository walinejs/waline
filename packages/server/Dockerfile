FROM node:lts-alpine

ENV WORKDIR /opt/waline

COPY src/packages/server/package.json ${WORKDIR}/package.json
RUN npm install 

COPY src/package/server/vanilla.js ${WORKDIR}/vanilla.js
COPY src/package/server/src ${WORKDIR}/src

ENTRYPOINT [ "node", "${WORKDIR}/vanilla.js" ]