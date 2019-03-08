# Node LTS 10.15.3 with alpine
# (a lightweight distribution)
FROM node:10.15.3-alpine
LABEL maintainer="Arthur D. <https://www.arthurdufour.com/>"

# add git (its not included in alpine)
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . .
