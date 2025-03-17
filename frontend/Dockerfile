# Step 1: Build the application
FROM node:23 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for npm install
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire Vue.js project into the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built app from the 'build' stage into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

# Expose the port that Nginx will listen on
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
