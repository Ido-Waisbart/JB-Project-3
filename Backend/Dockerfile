# Step 1: Base image (lightweight LTS version)
FROM node:20-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package dependency files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend files
COPY . .

# Step 6: Expose the backend API port
EXPOSE 4000

# Step 7: Start the application using ts-node
CMD ["npx", "ts-node", "src/app.ts"]
