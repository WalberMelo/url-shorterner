# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Copy the Prisma schema directory explicitly before npm install
COPY prisma ./prisma

# Install dependencies (this runs the postinstall script)
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client (this step ensures the client is generated)
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application's port
EXPOSE 3333

# Command to run the application
CMD ["npm", "run", "start:prod"]
