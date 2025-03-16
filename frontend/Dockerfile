# Step 1: Use an official Node.js runtime as a parent image
FROM node:23 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Vite project
RUN npm run build

# Step 7: Expose the port the app will run on (default for Vite is 5173)
EXPOSE 5173

# Step 8: Run the Vite app in production mode
CMD ["npm", "run", "preview"]
