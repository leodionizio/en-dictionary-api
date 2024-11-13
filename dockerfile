FROM node:18 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi

FROM node:18

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then yarn start:dev; else yarn start:prod; fi"]
