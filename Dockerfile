FROM --platform=linux/arm64 node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Disable Husky
ENV HUSKY_SKIP_HOOKS=1

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 4000
