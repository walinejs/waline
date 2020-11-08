FROM node:lts-alpine

ENV WORKDIR /opt/waline
WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}/package.json
RUN npm install 

COPY vanilla.js ${WORKDIR}/vanilla.js
COPY src ${WORKDIR}/src

ENTRYPOINT [ "node", "${WORKDIR}/vanilla.js" ]