// pusherService.js
import Pusher from "pusher-js";

const initializePusher = () => {
  const token = localStorage.getItem("token");
  const pusher = new Pusher(import.meta.env.VITE_REVERB_APP_KEY, {
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://localhost:8000/api/broadcasting/auth",
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
