# https://github.com/nodejs/LTS
FROM node:lts AS build
WORKDIR /app
ENV NODE_ENV="production"
COPY packages/server/package.json ./
RUN set -eux; \
	# npm config set registry https://registry.npm.taobao.org; \
	npm install --production --silent
COPY packages/server/ .

FROM node:lts-slim
WORKDIR /app
ENV TZ="Asia/Shanghai"
ENV NODE_ENV="production"
COPY --from=build /app .
EXPOSE 8360
CMD ["node", "vanilla.js"]
