FROM node:20
WORKDIR /app
COPY . .
RUN pnpm install
EXPOSE 8001
CMD ["pnpm", "run", "dev"]