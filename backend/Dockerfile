# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the API will listen on
EXPOSE 8000

# Command to start the API
CMD [ "npm", "start" ]