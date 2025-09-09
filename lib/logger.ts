export type LogLevel = "debug" | "info" | "error";

interface Meta {
  [key: string]: unknown;
}

const log = (level: LogLevel, message: string, meta?: Meta) => {
  if (process.env.NODE_ENV === "production") return;
  const entry: Record<string, unknown> = { level, message };
  if (meta) entry.meta = meta;
  console.log(JSON.stringify(entry));
};

export const logger = {
  debug: (message: string, meta?: Meta) => log("debug", message, meta),
  info: (message: string, meta?: Meta) => log("info", message, meta),
  error: (message: string, meta?: Meta) => log("error", message, meta),
};
