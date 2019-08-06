# Base image
FROM node:10.13-alpine as node

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package*.json /app/
RUN npm install

# Add app
COPY . /app

# Start app
CMD ng serve --host 0.0.0.0
