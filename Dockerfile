FROM node:22 as BUILD
WORKDIR /app
# Cache
COPY package.json package-lock.json /app/
RUN npm install

# Build
COPY . /app/
RUN npm run build
WORKDIR /app

# Run
FROM nginx:alpine
COPY --from=BUILD /app/build /usr/share/nginx/html

#testrunnera