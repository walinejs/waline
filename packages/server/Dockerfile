# https://github.com/nodejs/LTS
FROM node:lts AS build
WORKDIR /app
ENV NODE_ENV production
RUN set -eux; \
	# npm config set registry https://registry.npm.taobao.org; \
	npm install --production --silent @waline/vercel

FROM node:lts-buster-slim
WORKDIR /app
ENV TZ Asia/Shanghai
ENV NODE_ENV production
COPY --from=build /app .
EXPOSE 8360
CMD ["node", "node_modules/@waline/vercel/vanilla.js"]