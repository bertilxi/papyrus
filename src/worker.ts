/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

const logs: string[] = [];

const logger = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};

for (const method of Object.keys(logger)) {
  const handler = (...messages: any[]) => {
    logs.push(
      messages
        .map((m) => (typeof m === "object" ? JSON.stringify(m) : m))
        .join(" ")
    );
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    return logger[method](...messages);
  };

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  console[method] = handler;
}

function timeout(milliseconds: number) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("TIMEOUT")), milliseconds)
  );
}

function timedRun<T>(promise: Promise<T>, milliseconds: number) {
  return Promise.race([promise, timeout(milliseconds)]);
}

type Event = MessageEvent<{ url: string; timeout: number; data: object }>;

self.onmessage = async function run(event: Event) {
  const ini = Date.now();
  const { data, url, timeout = 5000 } = event.data;

  try {
    const { default: module } = await import(url);
    const result = await timedRun(module(data), timeout);

    return self.postMessage({
      ok: true,
      result,
      time: Date.now() - ini,
      logs,
    });
  } catch (error) {
    return self.postMessage({
      ok: false,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      time: Date.now() - ini,
      logs,
    });
  }
};
