# Stage build
FROM node:lts AS build

ENV WORKDIR /opt/waline
ENV TZ Asia/Shanghai

WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
RUN npm install --production

# Stage release
FROM node:lts-alpine

# Apinelinux timezone setup
# Reference to https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts#setup-timezone
ENV TZ Asia/Shanghai
RUN setup-timezone -z ${TZ}

ENV WORKDIR /opt/waline
WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
COPY packages/server/vanilla.js ${WORKDIR}/vanilla.js
COPY packages/server/src ${WORKDIR}/src
COPY --from=build /opt/waline/node_modules ./node_modules

EXPOSE 8360
ENTRYPOINT [ "node", "vanilla.js" ]
