FROM denoland/deno
EXPOSE 3000
WORKDIR /app
COPY . .
RUN deno cache main.ts
CMD ["deno", "task", "start"]