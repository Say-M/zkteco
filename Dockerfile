# Use the official Bun image
FROM oven/bun:1.3.6-alpine
WORKDIR /app
# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
# Copy application source and run
COPY . .
EXPOSE 8000
CMD ["bun", "run", "src/index.ts"]
