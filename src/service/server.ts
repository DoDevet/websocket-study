export const socket = new WebSocket("ws://localhost:8000");
socket.addEventListener("open", () => {
  console.log("Open");
});
socket.addEventListener("close", () => {
  console.log("close");
});
