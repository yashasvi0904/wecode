const { io } = require("socket.io-client");

// Connect socket globally
const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:2000";

const socket = io(socketUrl, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
});

module.exports = socket;
