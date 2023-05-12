FROM node:slim
WORKDIR /app
copy . /app
RUN npm install
EXPOSE 3000
CMD node index