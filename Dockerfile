# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (including src/public)
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]
