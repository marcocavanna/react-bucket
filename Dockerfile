# Create a primary Node Image to build Production App
FROM node:14.15.0-alpine AS Builder

# Set the work dir
WORKDIR /app

# Copy main Package File
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy all files into work dir
COPY . ./

# Expose the Port used by Serve
EXPOSE 57000

# Build production app
CMD ["yarn", "start:storybook"]
