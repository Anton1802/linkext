# Use the lightweight official Node.js image as a base
FROM node:23-alpine as builder

# Set environment variables
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (only production dependencies)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy the entire application source code
COPY . .

# Build the application
RUN yarn build

# Create the final production image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist /app/dist

# Install only production dependencies and remove cache
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main.js"]
