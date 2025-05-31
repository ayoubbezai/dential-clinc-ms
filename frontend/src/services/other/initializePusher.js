// pusherService.js
import Pusher from "pusher-js";

const initializePusher = () => {
  const token = localStorage.getItem("token");
  const pusher = new Pusher("xs5n6ysk7wwrglkxyrle", {
    wsHost: "192.168.1.4",
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://192.168.1.4:8000/api/broadcasting/auth",
    cluster: "",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return pusher;
};

export default initializePusher;
