# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application and .env file
COPY . .
COPY .env .env

# Install Prisma CLI
RUN npm run db:generate

# Build the app
RUN npm run build

# Expose the application port
EXPOSE ${PORT}

# Start the app
CMD ["npm", "run", "start:dev"]
