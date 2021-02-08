# https://github.com/nodejs/LTS
FROM node:lts AS build
WORKDIR /app
ENV NODE_ENV production
RUN set -eux; \
	# npm config set registry https://registry.npm.taobao.org; \
	npm install --production --silent @waline/vercel

FROM node:lts-alpine
WORKDIR /app
ENV TZ Asia/Shanghai
ENV NODE_ENV production
RUN set -eux; \
	# sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories; \
	apk add --no-cache bash; \
	apk add --no-cache --virtual .build-deps alpine-conf; \
	setup-timezone -z ${TZ}; \
	apk del --no-network .build-deps
COPY --from=build /app .
EXPOSE 8360
CMD ["node", "node_modules/@waline/vercel/vanilla.js"]