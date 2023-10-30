export const messageForm = (type: "nickname" | "message", payload: string) =>
  JSON.stringify({ type, payload });
