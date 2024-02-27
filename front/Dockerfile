# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 4200
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

# # Use the official Node.js image as the base image
# FROM node as build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# RUN npm i -g @angular/cli

# # Copy the entire project to the container
# COPY . .

# # Build the Angular app for production
# RUN ng build --prod

# Use a smaller, production-ready image as the final image
FROM nginx:alpine

# Copy the production-ready Angular app to the Nginx webserver's root directory
COPY ./dist/front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
