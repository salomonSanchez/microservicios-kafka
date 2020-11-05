FROM node:stretch-slim
# Create app directory
WORKDIR /usr/src/app/roomvisor-api-rest
# Bundle app source
COPY package.json .
RUN npm install
# Bundle app source
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]