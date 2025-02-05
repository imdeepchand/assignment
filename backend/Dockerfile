# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the port (change this if your app uses a different port)
EXPOSE 5000

# Run the compiled JavaScript file instead of TypeScript
CMD ["node", "dist/main.js"]
