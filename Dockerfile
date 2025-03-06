# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_DATABASE
ARG PORT
ARG DATABASE_URL
ARG JWT_SECRET

ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV DB_DATABASE=${DB_DATABASE}
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}


# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application and .env file
COPY . .
COPY .env ./

# Install Prisma CLI
RUN npm run db:generate

# Build the app
RUN npm run build

# Expose the application port
EXPOSE ${PORT}

# Start the app
CMD ["npm", "run", "start:dev"]
