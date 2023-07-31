FROM node:20-alpine
ENV NODE_ENV=development

# Making and defining working directory
RUN mkdir -p /app
WORKDIR /app

# Copying both package-lock.json and package.json
COPY ["package.json", "package-lock.json*", "./"]

# Installing dev dependencies
# RUN npm ci --omit=dev
RUN npm install

# Bundling app source files
COPY . ./