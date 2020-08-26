FROM node:latest

RUN mkdir -p /home/react

COPY ./webapp /home/react

WORKDIR /home/react/webapp

RUN npm install react-router-dom && \
    npm install react-pro-sidebar 

CMD npm start
