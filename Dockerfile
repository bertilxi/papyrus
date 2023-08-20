FROM denoland/deno

EXPOSE 3000

WORKDIR /app

COPY . .

RUN deno cache main.ts

RUN --mount=type=secret,id=S3_ACCESS_KEY --mount=type=secret,id=S3_SECRET_KEY \
    S3_ACCESS_KEY="$(cat /run/secrets/S3_ACCESS_KEY)" S3_SECRET_KEY="$(cat /run/secrets/S3_SECRET_KEY)" \
    deno task init

CMD ["deno", "task", "start"]