# Use the official Node.js image from the Docker Hub
FROM node:14

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN git clone https://github.com/zero-8848/userApp.git /usr/src/app

# Set the working directory to the backend directory
WORKDIR /usr/src/app/userApp/interview

# Install the dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["node", "index.js"]