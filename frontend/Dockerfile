FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "run", "dev" ]

# serving the build
# RUN npm run build
# EXPOSE 5173
# CMD [ "npm", "run", "preview" ]