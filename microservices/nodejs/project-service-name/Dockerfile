# Use the official Node.js image as the base image
FROM node:26@sha256:f8e5d4bb28fa55c74f1345166a082a10b7c68f22304350c1ce0d18358ae94996

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