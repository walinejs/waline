# Stage build
FROM node:lts AS build

ENV WORKDIR /opt/waline
ENV TZ Asia/Shanghai

WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
RUN npm install --production

# Stage release
FROM node:lts-alpine

# Setting the timezone
# Reference to https://wiki.alpinelinux.org/wiki/Setting_the_timezone
ENV TZ Asia/Shanghai
RUN apk update && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apk del --no-network tzdata

ENV WORKDIR /opt/waline
WORKDIR ${WORKDIR}

COPY packages/server/package.json ${WORKDIR}/package.json
COPY packages/server/vanilla.js ${WORKDIR}/vanilla.js
COPY packages/server/src ${WORKDIR}/src
COPY --from=build /opt/waline/node_modules ./node_modules

EXPOSE 8360
ENTRYPOINT [ "node", "vanilla.js" ]
