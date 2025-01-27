# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application's port
EXPOSE 3333

# Command to run the application
CMD ["npm", "run", "start:prod"]