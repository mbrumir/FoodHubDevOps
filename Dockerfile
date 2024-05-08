FROM node:22.1
COPY .. /app/
WORKDIR /app
RUN npm install --force
RUN npm install --save-dev gulp-install
CMD ["npm", "start"]
EXPOSE 3000