FROM node:20
WORKDIR /app
COPY . .
RUN pnpm install
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--", "--host"]