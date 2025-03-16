# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of your project files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the port your app will run on (usually 3000 for NestJS)
EXPOSE 3000

# Start the NestJS application
CMD ["yarn", "start:prod"]
