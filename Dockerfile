FROM node:latest

RUN mkdir -p /home/react

COPY . /home/react

WORKDIR /home/react

RUN npm install react-router-dom && \
    npm install react-pro-sidebar 

CMD npm start
