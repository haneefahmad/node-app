# Use official Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy the entire project (this includes src/public)
COPY . .

# Expose the port
EXPOSE 3000

# Start the Node.js app
CMD ["node", "src/index.js"]
