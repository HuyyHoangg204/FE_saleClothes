    # 1. For build React app
    FROM node:lts AS build
    # Set working directory
    WORKDIR /app
    #
    COPY package.json /app/package.json
    COPY package-lock.json /app/package-lock.json
    # Same as npm install
    RUN npm install
    COPY . .
    EXPOSE 5173
    RUN npm run build
    # 2. For Nginx setup
    FROM nginx:alpine
    # Copy config nginx
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    WORKDIR /usr/share/nginx/html
    # Remove default nginx static assets
    RUN rm -rf ./*
    # Copy static assets from builder stage
    COPY --from=build /app/dist .
    # Containers run nginx with global directives and daemon off
    ENTRYPOINT ["nginx", "-g", "daemon off;"]
