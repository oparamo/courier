FROM node:10-alpine as builder

WORKDIR /courier

COPY public /courier/public
COPY src /courier/src
COPY package.json yarn.lock tsconfig.json /courier/
RUN yarn install --frozen-lockfile && yarn build

FROM nginx:1.15-alpine

COPY --from=builder /courier/build/ /usr/share/nginx/html
