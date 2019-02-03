# Node LTS 10.15 with alpine
# (a lightweight distribution)
FROM node:10.15.0
LABEL maintainer="Arthur D. <https://www.arthurdufour.com/>"

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . . 

# DON'T (deletes all default klasa commands)
# RUN rm -rdf /usr/src/app/node_modules/klasa/src/commands/*

# runs the bot in development mode:
# - uses a special bot token
# - uses nodemon 
CMD ["npm", "run", "dev"]