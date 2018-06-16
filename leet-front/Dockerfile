FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY build /usr/src/app/
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-l", "3000"]

