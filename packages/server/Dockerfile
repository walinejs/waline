# https://github.com/nodejs/LTS
FROM node:lts AS build
WORKDIR /app
ENV NODE_ENV="production"
COPY packages/server/package.json packages/server/vanilla.js ./
COPY packages/server/src ./src
RUN set -eux; \
	# npm config set registry https://registry.npm.taobao.org; \
	npm install --production --silent

FROM node:lts-slim
WORKDIR /app
ENV TZ="Asia/Shanghai"
ENV NODE_ENV="production"
COPY --from=build /app .
EXPOSE 8360
CMD ["node", "vanilla.js"]
