FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first (better layer caching).
# package-lock.json is optional — the template git-ignores it.
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]
