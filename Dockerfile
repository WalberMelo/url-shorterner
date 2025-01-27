# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the Prisma schema directory
COPY prisma ./prisma

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application's port
EXPOSE 3333

# Command to run Prisma migrations before starting the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
