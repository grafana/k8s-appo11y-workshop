# Use the official Node.js image as the base image
FROM node:22@sha256:c8abd8da9cfddd2dfd2d5aa9ea2e54f9f70d3968ecf81bf5c2422594fa13fa83

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev --quiet

# Copy the rest of the application code
COPY public ./public
COPY server ./server

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "server/server.js"]