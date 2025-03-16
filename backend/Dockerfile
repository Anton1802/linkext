# Use the official Node.js image as a base
FROM node:23-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Prepare for the production image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist /app/dist

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the port your app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
