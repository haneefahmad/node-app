# Use official Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /node-app

# Copy package files first (for dependency caching)
COPY package*.json ./
RUN npm install

# Copy entire project (including src/public)
COPY src ./src

# Expose app port
EXPOSE 3000

# Start the Node.js app
CMD ["node", "src/index.js"]
