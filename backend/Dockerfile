# Step 1: Use an official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the backend dependencies
RUN npm install

# Step 5: Copy the rest of the backend code
COPY . .

# Step 6: Expose the backend port (8081)
EXPOSE 8081

# Step 7: Start the backend application
CMD ["npm", "start"]
